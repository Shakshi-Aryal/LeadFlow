# LeadFlow: Technical Architecture Documentation

## 1. High-Level System Architecture

LeadFlow is an AI-powered lead qualification automation platform designed to evaluate incoming leads and route them efficiently based on their value. 
The system operates as a serverless/low-code hybrid, utilizing React for the user interface and n8n as the central integration hub.

- **Client Tier**: A React SPA that captures user enquiries.
- **Integration/Workflow Tier**: n8n orchestrates the business logic and API integrations.
- **AI Processing Tier**: Cloudflare Workers AI (Serverless edge LLMs like `@cf/meta/llama-3.2-3b-instruct` or `@cf/meta/llama-3.1-8b-instruct`) processes lead data.
- **Storage Tier**: Google Sheets acts as a lightweight CRM/database.
- **Notification Tier**: Gmail API delivers alerts for high-value leads.

---

## 2. Detailed Component Architecture

- **Frontend Application (React/Vite)**
  - Collects lead data via forms.
  - Validates input locally.
  - Submits payload to the n8n Webhook.
- **n8n Webhook Trigger**
  - Exposes an endpoint to receive POST requests from the Frontend.
  - Enforces basic authentication or header validation.
- **Cloudflare Workers AI Node (AI Processor)**
  - Constructs a prompt injecting incoming lead data.
  - Calls Cloudflare Workers AI via its OpenAI-compatible endpoint or an HTTP Request node.
  - Requests structured JSON output classifying the lead (Hot, Warm, Cold).
- **Google Sheets Node (Data Sink)**
  - Appends a new row containing the original lead data plus the AI's analysis score, category, and reason.
- **Condition/Switch Node (Routing)**
  - Evaluates the AI category. If `category === 'Hot'`, routes to the Gmail Node.
- **Gmail Node (Notifier)**
  - Dispatches an email to the sales team with the lead's contact information and the AI's reasoning.

---

## 3. Diagrams Reference

*(The visual diagrams for LeadFlow are maintained as separate modular files within the `docs/` directory for clarity and reuse)*

- **System Architecture Diagram**: See `docs/diagrams/system_architecture.mmd`
- **Data Flow Diagram**: See `docs/diagrams/data_flow.mmd`
- **Sequence Diagram**: See `docs/diagrams/sequence_diagram.mmd`

---

## 4. API Request/Response Design

### Frontend to n8n Webhook
**Endpoint**: `POST https://[n8n-instance]/webhook/lead-submit`  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "company": "Acme Corp",
  "inquiry": "We are looking for an enterprise automation solution for 500 employees.",
  "budget": "$10,000",
  "source": "Organic Search"
}
```

**Response** (Immediate Acknowledgment):
```json
{
  "status": "success",
  "message": "Lead received and is being processed."
}
```

### n8n to Cloudflare Workers AI
**Endpoint**: `POST https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}/ai/v1/chat/completions`  
**Headers**: 
- `Authorization: Bearer <CLOUDFLARE_WORKERS_AI_TOKEN>`
- `Content-Type: application/json`

**Request Body**:
```json
{
  "model": "@cf/meta/llama-3.2-3b-instruct",
  "messages": [
    {
      "role": "system",
      "content": "You are a lead scoring assistant. Evaluate the incoming lead and respond strictly in valid JSON with fields: score (number), category ('Hot'|'Warm'|'Cold'), and reason (string)."
    },
    {
      "role": "user",
      "content": "Name: Jane Doe, Company: Acme Corp, Inquiry: Enterprise solution for 500 employees, Budget: $10,000"
    }
  ]
}
```

**Expected AI Response** (JSON structure):
```json
{
  "score": 95,
  "category": "Hot",
  "reason": "Enterprise size company with explicit automation needs and substantial budget."
}
```

---

## 5. Repository Folder Structure

```text
LeadFlow/
├── frontend/                 # React Application (Vite + Tailwind)
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI elements (Forms, Buttons)
│   │   ├── hooks/            # Custom React hooks (useSubmitLead)
│   │   ├── services/         # API call utilities
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── n8n/                      # n8n configurations and exports
│   ├── workflows/            # Exported JSON of n8n workflows
│   │   └── lead_processing.json
│   └── docker-compose.yml    # If self-hosting n8n
├── docs/                     # Documentation and modular diagrams
│   ├── diagrams/             # Mermaid diagram files
│   │   ├── system_architecture.mmd
│   │   ├── data_flow.mmd
│   │   └── sequence_diagram.mmd
│   └── ARCHITECTURE.md
└── README.md
```

---

## 6. Security Considerations

- **Webhook Protection**: Implement a secret token in the frontend request header that n8n validates before processing, preventing unauthorized spam submissions.
- **CORS Configuration**: Restrict the n8n webhook to only accept requests originating from the production React app's domain.
- **API Key Management**: Store Cloudflare API Tokens, Gmail, and Google Sheets credentials securely within n8n's credential manager, never hardcoded in workflows or the frontend.
- **PII Data Minimization**: Ensure that only necessary information is sent to the AI model to avoid exposing sensitive PII unnecessarily. Do not log full lead payloads in unsecured plain text logs.

---

## 7. Error Handling Strategy

- **Frontend Validation**: Ensure forms cannot be submitted with invalid emails or empty required fields.
- **Webhook Timeouts**: The frontend should implement a timeout and retry mechanism, gracefully informing the user if the backend is unreachable.
- **n8n Error Routes**: Implement an "Error Trigger" node in n8n. If the Cloudflare AI API fails or Google Sheets is down, the workflow should catch the error and route the raw lead to a fallback mechanism (e.g., a dead-letter queue or direct email without AI analysis).
- **AI Hallucination Mitigation**: Enforce standard prompt formatting for JSON output. n8n should validate and parse the JSON; if parsing fails, a default score of 0 and category "Manual Review" should be assigned.

---

## 8. Future Scalability Improvements

- **Database Migration**: Replace Google Sheets with a robust SQL database (e.g., PostgreSQL) or a CRM (e.g., HubSpot, Salesforce) as lead volume increases.
- **Asynchronous Processing Queue**: Introduce a message broker (RabbitMQ or Redis) between the webhook and the processing logic to handle sudden spikes in traffic without dropping leads.
- **Custom AI Fine-Tuning**: Move from a generalized prompt to a fine-tuned model or RAG approach trained on the company's historical conversion data to improve scoring accuracy.
- **A/B Testing**: Introduce multiple n8n workflows evaluating different AI prompts or open-weights models in parallel to continuously refine the qualification criteria.
