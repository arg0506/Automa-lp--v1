// Source: automa_documentation.md. Keep this file in sync with that document.
// Inline markup: **bold** and `code`.

export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "olist"; items: string[] }
  | { type: "defs"; items: { term: string; text: string }[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "code"; lang: string; text: string }
  | { type: "note"; label: string; text: string }
  | { type: "diagram"; name: DiagramName; caption: string };

export type DiagramName =
  | "overview"
  | "separation"
  | "sequence"
  | "balance"
  | "policy-pipeline"
  | "lifecycle"
  | "integration"
  | "trust-boundary";

export type DocGroup = "Get started" | "Wallets and policies" | "Integration" | "Network and security" | "Use and risk" | "Reference";

export type DocSection = {
  id: string;
  number: string;
  title: string;
  group: DocGroup;
  blocks: Block[];
};

export const docGroups: DocGroup[] = [
  "Get started",
  "Wallets and policies",
  "Integration",
  "Network and security",
  "Use and risk",
  "Reference",
];

export const docs = {
  title: "Documentation",
  eyebrowSans: "Automa",
  headlineSerif: "Documentation.",
  intro:
    "Programmable financial infrastructure for the agentic economy. Automa is a project concept for giving autonomous AI agents a controlled way to hold funds, request payments, and pay for digital services, while keeping human-defined rules, budgets, and visibility at the center.",
  network: "NEAR Protocol",
  status:
    "Product and architecture documentation. Features described as planned or conceptual should not be interpreted as proof that they are already deployed or audited.",
  statusLegend: [
    { label: "Planned", text: "Designed or proposed. Not built." },
    { label: "In development", text: "Being built. Details may change." },
    { label: "Test environments", text: "Available for testing only. Not for real funds." },
    { label: "Production", text: "Available for real use, once verified against the release." },
  ],
  sections: [
    {
      id: "introduction",
      number: "01",
      title: "Introduction",
      group: "Get started",
      blocks: [
        {
          type: "p",
          text: "Automa is designed around a simple idea: **AI agents should be able to use money to complete tasks, but they should not receive unrestricted control over it.**",
        },
        {
          type: "p",
          text: "AI agents can research, write code, analyze data, call APIs, coordinate workflows, and perform other digital work. Many of these workflows depend on paid resources: model inference, cloud compute, datasets, software tools, APIs, storage, and specialist services. Today, payments often interrupt automation because a human must approve every purchase, provision a credential, or manage a separate billing account.",
        },
        {
          type: "p",
          text: "Automa aims to provide a programmable financial layer between an AI agent and the services it uses. A user funds a wallet, defines the boundaries within which an agent may operate, and lets the agent request or initiate eligible payments. The policy layer determines whether a payment fits the configured permissions.",
        },
        {
          type: "p",
          text: "The intended outcome is **useful autonomy without unlimited financial authority**.",
        },
        {
          type: "diagram",
          name: "overview",
          caption: "Automa sits between the agent and the services it pays. Blue marks the core product, which is planned.",
        },
        { type: "h3", text: "What Automa aims to provide" },
        {
          type: "defs",
          items: [
            { term: "Agent wallets", text: "A dedicated financial context for an AI agent or workflow." },
            { term: "Policy-controlled spending", text: "Budgets, limits, approved recipients, and transaction rules." },
            { term: "Programmatic payments", text: "A way for software agents to pay for eligible digital services." },
            { term: "Human oversight", text: "User control over funding, permissions, revocation, and monitoring." },
            { term: "Activity visibility", text: "A clear record of requests, decisions, and transaction outcomes." },
            { term: "On-chain foundations", text: "Use of NEAR Protocol for blockchain-based financial operations where supported by the implemented product." },
          ],
        },
        { type: "h3", text: "What Automa is not" },
        {
          type: "p",
          text: "Automa should not be understood as a promise that every AI agent can spend freely, that every service accepts crypto, or that every payment is automatically safe. A policy system can reduce risk, but it cannot eliminate malicious instructions, compromised integrations, bugs, market volatility, or mistakes by a user.",
        },
        {
          type: "note",
          label: "Scope",
          text: "This documentation describes the product direction and a proposed operational model. Network support, specific assets, API endpoints, integrations, and production availability must be confirmed against the current implementation before use.",
        },
      ],
    },
    {
      id: "the-problem",
      number: "02",
      title: "The Problem",
      group: "Get started",
      blocks: [
        { type: "h3", text: "2.1 Agents can act, but payments remain manual" },
        {
          type: "p",
          text: "An agent may be able to complete most of a workflow autonomously but still depend on a human to purchase API credits, approve cloud usage, pay a data provider, or authorize a contractor. This creates interruptions and limits how reliably an agent can operate unattended.",
        },
        { type: "h3", text: "2.2 Existing payment credentials are too powerful" },
        {
          type: "p",
          text: "Giving an agent access to a personal card, a broad API key, or a wallet's unrestricted signing capability can create excessive risk. A bug or prompt injection may cause the agent to spend more than intended, call an untrusted service, or expose credentials.",
        },
        { type: "h3", text: "2.3 Budgets and permissions are fragmented" },
        {
          type: "p",
          text: "A user may need to configure spending limits across several tools, accounts, and service dashboards. It can be difficult to understand what an agent is allowed to buy, how much it has spent, and which services it has interacted with.",
        },
        { type: "h3", text: "2.4 Digital services are not always designed for machine buyers" },
        {
          type: "p",
          text: "Agents need a reliable way to identify a service, understand its price, request access, submit payment, and receive confirmation. Different providers have different billing systems, authentication methods, and settlement requirements.",
        },
        { type: "h3", text: "2.5 Financial actions need accountability" },
        {
          type: "p",
          text: "Autonomous workflows need more than a successful transaction. Users should be able to understand why a payment was requested, which policy allowed or rejected it, where funds were sent, and whether the transaction succeeded.",
        },
        {
          type: "note",
          label: "Design challenge",
          text: "Make machine-initiated payments practical while keeping authority constrained, observable, and revocable.",
        },
      ],
    },
    {
      id: "the-automa-approach",
      number: "03",
      title: "The Automa Approach",
      group: "Get started",
      blocks: [
        {
          type: "p",
          text: "Automa separates **the agent's ability to request an action** from **the authority to approve and execute that action**.",
        },
        {
          type: "p",
          text: "An agent can identify a need and request a payment. A policy and authorization layer checks the request against user-defined rules. If the request is permitted and all technical checks pass, the payment can proceed through the supported wallet and network flow. The resulting status is recorded so the user can inspect it.",
        },
        {
          type: "diagram",
          name: "separation",
          caption: "The agent requests. The policy engine decides. The wallet executes only what was allowed.",
        },
        { type: "h3", text: "Design principles" },
        {
          type: "defs",
          items: [
            { term: "Bounded autonomy", text: "Agents operate within explicit permissions, not unlimited financial authority." },
            { term: "Least privilege", text: "Give each agent only the funds and capabilities needed for its task." },
            { term: "User-defined rules", text: "Spending limits and recipient permissions should be configured by the wallet owner." },
            { term: "Visible activity", text: "Requests, decisions, and outcomes should be understandable." },
            { term: "Revocability", text: "Users should be able to pause an agent or change its permissions." },
            { term: "Fail safely", text: "Uncertain, malformed, or disallowed requests should not silently become payments." },
            { term: "Clear separation of concerns", text: "The agent, policy engine, wallet, and blockchain have distinct responsibilities." },
            { term: "Honest transaction status", text: "A request, an approval, a submitted transaction, and a confirmed transaction are different states." },
          ],
        },
        { type: "h3", text: "Intended benefits" },
        {
          type: "list",
          items: [
            "Fewer manual interruptions for routine, authorized payments.",
            "A clearer boundary between AI reasoning and financial authority.",
            "More structured oversight across multiple agents.",
            "A foundation for machine-to-machine commerce.",
            "Better traceability than an opaque flow of ad hoc payment credentials.",
          ],
        },
      ],
    },
    {
      id: "core-concepts",
      number: "04",
      title: "Core Concepts",
      group: "Get started",
      blocks: [
        {
          type: "defs",
          items: [
            { term: "User", text: "The person or organization that configures Automa, funds the wallet, defines policies, and decides which agents may operate." },
            { term: "Agent", text: "A software process that performs tasks and may request eligible payments. An agent can be an AI assistant, a scheduled workflow, or another autonomous program. An agent is not automatically trusted merely because it is registered." },
            { term: "Agent wallet", text: "A wallet or wallet context associated with an agent's permitted financial activity. Its purpose is to separate an agent's operational budget from a user's broader holdings. The precise custody and signing design depends on the deployed implementation." },
            { term: "Policy", text: "A set of rules that defines what an agent may do financially. Examples include a maximum payment amount, a daily budget, an approved recipient list, or a requirement for human approval." },
            { term: "Budget", text: "A spending allowance over a defined period or task. A budget must be evaluated against prior spending and pending reservations to avoid approving multiple requests that collectively exceed the intended limit." },
            { term: "Recipient or service", text: "The destination of a payment. A recipient may be a service provider, an application, a contractor, a smart contract, or another supported account. Recipient identity should be verified using the strongest available mechanism; a display name alone is not sufficient." },
            { term: "Payment request", text: "A structured request describing a proposed payment. It should include at minimum the amount, asset, destination, purpose or reference, requesting agent, and a unique request identifier." },
            { term: "Authorization decision", text: "The outcome of evaluating a request against policy and security checks. Possible outcomes include allowed, rejected, or requiring human approval." },
            { term: "Transaction", text: "The actual blockchain operation, if one is submitted. A payment request is not a transaction, and an approved request is not proof of settlement." },
            { term: "Audit trail", text: "A sequence of records that helps explain what happened: request creation, policy evaluation, approval or rejection, submission, network response, and final status. Sensitive secrets should never be written into this trail." },
          ],
        },
      ],
    },
    {
      id: "how-automa-works",
      number: "05",
      title: "How Automa Works",
      group: "Get started",
      blocks: [
        { type: "p", text: "A typical workflow follows these stages:" },
        {
          type: "diagram",
          name: "sequence",
          caption: "Six stages from need to record. Each one has a distinct owner.",
        },
        {
          type: "olist",
          items: [
            "**Create or connect a wallet.** The user establishes the wallet context supported by the application.",
            "**Fund the wallet.** The user transfers supported assets into the designated wallet.",
            "**Register an agent.** The user connects an agent or workflow and grants it limited permissions.",
            "**Configure policies.** The user defines budgets, limits, recipients, approval rules, and other supported restrictions.",
            "**Agent identifies a need.** While performing its task, the agent determines that a paid service or resource is required.",
            "**Agent submits a payment request.** The request includes the details needed to evaluate the proposed payment.",
            "**Automa validates the request.** The system checks request format, agent status, policy, available balance, recipient restrictions, duplicate requests, and other implemented controls.",
            "**Decision is made.** The request is allowed, rejected, or routed for human approval according to the configured rules.",
            "**Payment is submitted.** If authorized, the wallet or transaction component submits the supported network operation.",
            "**Network status is tracked.** The system distinguishes submission from confirmation and handles failures or delays.",
            "**Activity is recorded.** The user can inspect the request, decision, transaction reference, and result.",
            "**Permissions can be changed.** The user can pause the agent, change policies, or revoke access when needed.",
          ],
        },
        {
          type: "note",
          label: "Important distinction",
          text: "The policy check is an application-level control unless the implemented architecture explicitly enforces the same restriction at the wallet or smart-contract level. A user should not assume that a dashboard rule alone can prevent every unauthorized transaction if the agent has access to a separate unrestricted signing key.",
        },
      ],
    },
    {
      id: "wallets-and-fund-management",
      number: "06",
      title: "Wallets and Fund Management",
      group: "Wallets and policies",
      blocks: [
        { type: "h3", text: "6.1 Purpose of the wallet" },
        {
          type: "p",
          text: "The wallet is intended to hold only the funds allocated to agent activity, rather than serving as a user's entire personal wallet. Separating funds can limit exposure if an agent or integration is compromised.",
        },
        { type: "h3", text: "6.2 Funding" },
        {
          type: "p",
          text: "A user should fund an agent wallet with only the amount appropriate for its workload. Before sending funds, verify the network, destination address, asset, and any required account setup. Blockchain transfers may be irreversible.",
        },
        { type: "h3", text: "6.3 Balance and available spending" },
        { type: "p", text: "A useful wallet view distinguishes:" },
        {
          type: "defs",
          items: [
            { term: "Total balance", text: "The assets held by the wallet." },
            { term: "Reserved amount", text: "Funds earmarked for pending payment requests, if reservations are implemented." },
            { term: "Available amount", text: "The balance that can still be allocated after applicable reservations and fees." },
            { term: "Spent amount", text: "Completed outgoing payments within the relevant period." },
            { term: "Budget remaining", text: "The allowance left under a configured policy." },
          ],
        },
        {
          type: "p",
          text: "These values should be clearly defined by the application. They may differ if the implementation does not reserve funds for pending requests.",
        },
        {
          type: "diagram",
          name: "balance",
          caption: "How one wallet's funds and one daily budget can be read. Values are examples, not live data.",
        },
        { type: "h3", text: "6.4 Assets and networks" },
        {
          type: "p",
          text: "Only assets and networks explicitly supported by the current deployment should be used. Confirm token identifiers, decimals, network selection, fee requirements, and destination compatibility before making a transfer. Do not assume that a token with the same symbol on two networks is the same asset.",
        },
        { type: "h3", text: "6.5 Custody and signing" },
        {
          type: "p",
          text: "The product must clearly disclose whether the user retains control of the wallet, whether signing occurs locally or through a service, whether any key material is stored by the application, and how agent authorization is enforced. These are material security properties and must not be inferred from the presence of a wallet dashboard.",
        },
        { type: "h3", text: "6.6 Operational recommendations" },
        {
          type: "list",
          items: [
            "Keep agent funds separate from long-term holdings.",
            "Use low limits for new agents.",
            "Test with a test network or small amounts before production use.",
            "Keep enough supported native asset for network fees where required.",
            "Review balances and pending requests regularly.",
            "Do not share seed phrases or private keys with an AI agent, chat, website, or support representative.",
          ],
        },
      ],
    },
    {
      id: "spending-policies-and-permissions",
      number: "07",
      title: "Spending Policies and Permissions",
      group: "Wallets and policies",
      blocks: [
        { type: "p", text: "Policies are the core mechanism for bounding agent activity." },
        { type: "h3", text: "7.1 Amount limits" },
        {
          type: "p",
          text: "A policy may define a maximum amount per transaction. It may also define minimum amounts, maximum cumulative spend, or thresholds that trigger approval. Limits should be expressed in unambiguous asset units and validated against token decimals.",
        },
        { type: "h3", text: "7.2 Time-based budgets" },
        {
          type: "p",
          text: "A budget may apply per task, hour, day, week, month, or another configured period. The system should specify when each period resets and how pending transactions are counted.",
        },
        { type: "h3", text: "7.3 Approved recipients" },
        {
          type: "p",
          text: "Users may restrict an agent to a list of approved destination accounts or service identities. The system should use stable identifiers rather than relying only on human-readable names.",
        },
        { type: "h3", text: "7.4 Service restrictions" },
        {
          type: "p",
          text: "A policy may allow certain service categories and deny others. Category restrictions are only as reliable as the provider metadata and validation used to classify a recipient; they should not be treated as a substitute for verifying the actual destination.",
        },
        { type: "h3", text: "7.5 Human approval" },
        {
          type: "p",
          text: "Higher-risk payments can require confirmation from the user. For example, approval might be required when a payment exceeds a threshold, a new recipient is used, or a request falls outside routine behavior.",
        },
        { type: "h3", text: "7.6 Agent-level permissions" },
        {
          type: "p",
          text: "Different agents should be able to receive different policies. A research agent might only purchase data from approved providers, while a deployment agent might be allowed to pay for a small amount of compute. Avoid giving every agent the same broad permission set.",
        },
        { type: "h3", text: "7.7 Expiration and revocation" },
        {
          type: "p",
          text: "Permissions should be time-limited where practical. Users should be able to pause an agent, revoke its authorization, disable a connected service, or replace a compromised credential. The exact effect of revocation depends on the implementation: it may prevent new requests but cannot necessarily cancel transactions already submitted to a blockchain.",
        },
        {
          type: "diagram",
          name: "policy-pipeline",
          caption: "Each check must pass in order. A failed or incomplete check stops the request.",
        },
        { type: "h3", text: "7.8 Recommended policy evaluation order" },
        { type: "p", text: "A robust evaluation flow should consider:" },
        {
          type: "olist",
          items: [
            "Is the agent registered and active?",
            "Is the request authenticated and well-formed?",
            "Is the request fresh and not a duplicate?",
            "Is the asset and network supported?",
            "Is the destination permitted?",
            "Is the amount within the per-transaction limit?",
            "Does cumulative spend remain within the budget?",
            "Is the available balance sufficient, including estimated fees?",
            "Does the request require human approval?",
            "Are any risk checks or operational safeguards failing?",
          ],
        },
        {
          type: "note",
          label: "Fail closed",
          text: "If a required check cannot be completed, the system should reject the request or require review rather than silently bypassing the check.",
        },
      ],
    },
    {
      id: "payments-and-transaction-lifecycle",
      number: "08",
      title: "Payments and Transaction Lifecycle",
      group: "Wallets and policies",
      blocks: [
        {
          type: "diagram",
          name: "lifecycle",
          caption: "Only Confirmed means settled. Terminal outcomes can occur before confirmation.",
        },
        { type: "h3", text: "8.1 Suggested payment states" },
        {
          type: "p",
          text: "A clear state model can use the following statuses. The actual application may use different labels.",
        },
        {
          type: "defs",
          items: [
            { term: "Created", text: "A payment request has been recorded." },
            { term: "Validating", text: "Request and policy checks are in progress." },
            { term: "Rejected", text: "A rule or validation check failed." },
            { term: "Awaiting approval", text: "A human decision is required." },
            { term: "Authorized", text: "The request passed policy checks but may not yet have been submitted." },
            { term: "Submitted", text: "A transaction has been sent to the network." },
            { term: "Pending confirmation", text: "The network has not yet reached the required confirmation state." },
            { term: "Confirmed", text: "The application has verified the required network outcome." },
            { term: "Failed", text: "The transaction or processing attempt failed." },
            { term: "Expired", text: "A request was not completed within its validity period." },
            { term: "Cancelled", text: "The request was cancelled before submission, where cancellation is supported." },
          ],
        },
        {
          type: "note",
          label: "Do not",
          text: "Do not use \"successful\" merely because an agent created a request or the interface received a submission response.",
        },
        { type: "h3", text: "8.2 Idempotency and duplicate prevention" },
        {
          type: "p",
          text: "Agents may retry requests after timeouts. Each request should have a unique identifier or idempotency key so a retry does not unintentionally create a second payment. The implementation should also consider duplicate transactions, replayed requests, and concurrent requests competing for the same budget.",
        },
        { type: "h3", text: "8.3 Fees and amounts" },
        {
          type: "p",
          text: "The system should communicate whether the requested amount includes or excludes network fees, how fees are estimated, and what happens if fees change before submission. If a transaction requires a separate native token for gas, the interface should make that requirement clear.",
        },
        { type: "h3", text: "8.4 Confirmation and reconciliation" },
        {
          type: "p",
          text: "After submission, the system should track the transaction using the appropriate network data and reconcile the result with the internal payment record. If the application cannot verify the outcome, it should show an unknown or pending state instead of claiming success.",
        },
        { type: "h3", text: "8.5 Refunds and reversals" },
        {
          type: "p",
          text: "Blockchain transactions are generally not reversible by the application after confirmation. A refund usually requires a separate payment from the recipient or a provider-specific refund mechanism. Users should verify recipients before authorizing a transaction.",
        },
      ],
    },
    {
      id: "agent-and-service-integration",
      number: "09",
      title: "Agent and Service Integration",
      group: "Integration",
      blocks: [
        {
          type: "p",
          text: "Automa's intended role is to connect agent workflows with controlled payment capabilities. Integration details depend on the available SDK, API, wallet adapter, and service support in the current release.",
        },
        {
          type: "diagram",
          name: "integration",
          caption: "Solid lines are the request path. Dashed lines are the status path back to the agent and owner.",
        },
        { type: "h3", text: "9.1 Integration components" },
        { type: "p", text: "A typical integration may contain:" },
        {
          type: "defs",
          items: [
            { term: "Agent runtime", text: "The software performing the task." },
            { term: "Automa client or connector", text: "The component that submits requests to Automa." },
            { term: "Identity and authorization", text: "Identifies the agent and determines which actions it can request." },
            { term: "Policy evaluator", text: "Checks a request against the user's configured rules." },
            { term: "Wallet/transaction component", text: "Performs authorized blockchain operations." },
            { term: "Service adapter", text: "Connects to a provider's API or payment flow." },
            { term: "Status handler", text: "Reports outcomes back to the agent and dashboard." },
          ],
        },
        {
          type: "p",
          text: "These are conceptual components, not a claim that each is already available as a public module.",
        },
        { type: "h3", text: "9.2 Service discovery" },
        {
          type: "p",
          text: "Before paying a provider, an agent should have access to a trustworthy description of the service, price, destination, payment asset, and terms. Where possible, pricing and recipient identity should be verified independently of instructions supplied by the agent itself.",
        },
        { type: "h3", text: "9.3 Agent identity" },
        {
          type: "p",
          text: "Each agent should have a distinct identity or credential. Credentials should be scoped, rotatable, and revocable. A shared secret used by multiple agents makes it harder to attribute actions and contain a compromise.",
        },
        { type: "h3", text: "9.4 Least-privilege integration" },
        {
          type: "p",
          text: "An agent connector should expose only the actions the agent needs. If the task only requires requesting a small payment, the agent should not receive private keys or unrestricted wallet signing access.",
        },
        { type: "h3", text: "9.5 Integration failure" },
        {
          type: "p",
          text: "If the connector times out, it should check the existing request's status before retrying a payment. A timeout does not prove that the payment failed; the request may have reached the service or network even when the response was lost.",
        },
      ],
    },
    {
      id: "dashboard-and-activity-monitoring",
      number: "10",
      title: "Dashboard and Activity Monitoring",
      group: "Integration",
      blocks: [
        {
          type: "p",
          text: "The dashboard should make financial activity understandable without requiring users to inspect raw blockchain data for every action.",
        },
        { type: "h3", text: "10.1 Overview" },
        { type: "p", text: "A useful overview can show:" },
        {
          type: "list",
          items: [
            "Wallet balance and available funds.",
            "Total spend over the selected period.",
            "Budget remaining.",
            "Connected or registered agents.",
            "Active, paused, or revoked agent status.",
            "Pending approvals and transactions.",
            "Recent payment activity.",
            "Alerts requiring attention.",
          ],
        },
        {
          type: "p",
          text: "Only show metrics that the application can calculate reliably and explain.",
        },
        { type: "h3", text: "10.2 Agent details" },
        {
          type: "p",
          text: "Each agent's detail view should explain its status, associated wallet, current permissions, spending limits, recent activity, and any outstanding approvals. The user should be able to identify which agent initiated a request.",
        },
        { type: "h3", text: "10.3 Connected services" },
        {
          type: "p",
          text: "A service view can list connected applications, their permission scopes, recipient identifiers, connection status, and the time of the last activity. It should offer a clear way to disable a connection.",
        },
        { type: "h3", text: "10.4 Transaction details" },
        {
          type: "p",
          text: "For each payment, provide the requested amount and asset, destination, purpose or reference, requesting agent, policy decision, fees if known, transaction identifier when available, current status, timestamps, and any failure explanation that can be safely disclosed.",
        },
        { type: "h3", text: "10.5 Alerts" },
        {
          type: "p",
          text: "Useful alerts include a low balance, a budget approaching its limit, repeated rejected requests, a new recipient, an unusual spending pattern, a transaction that remains pending, or a credential that should be rotated. Alert thresholds should be configurable where appropriate.",
        },
      ],
    },
    {
      id: "near-protocol-and-network-design",
      number: "11",
      title: "NEAR Protocol and Network Design",
      group: "Network and security",
      blocks: [
        {
          type: "p",
          text: "Automa is being developed with NEAR Protocol as its network focus. NEAR provides a blockchain environment for accounts and on-chain applications. The precise way Automa uses NEAR, such as which account model, contracts, token standards, signing flow, and network environment are enabled, must be verified against the implementation.",
        },
        {
          type: "diagram",
          name: "trust-boundary",
          caption: "Where each responsibility runs. A rule enforced only off-chain has different guarantees from one enforced by a contract.",
        },
        { type: "h3", text: "11.1 On-chain and off-chain responsibilities" },
        { type: "p", text: "A potential design separates responsibilities:" },
        {
          type: "list",
          items: [
            "**On-chain components may handle:** asset transfers supported by the network; contract-enforced authorization or spending rules, if implemented; public transaction records and verifiable contract state.",
            "**Off-chain components may handle:** user interface and dashboard rendering; agent orchestration and service discovery; policy evaluation that is not enforced by a contract; notifications, indexing, analytics, and integration management.",
          ],
        },
        {
          type: "p",
          text: "The exact boundary matters. A policy enforced only by a server can have different guarantees from a rule enforced by a smart contract. Documentation should state which restrictions are on-chain, which are off-chain, and what happens if an off-chain service is unavailable or compromised.",
        },
        { type: "h3", text: "11.2 Network selection" },
        {
          type: "p",
          text: "Users and developers should confirm whether they are interacting with a test network or mainnet before signing or funding. Test assets and mainnet assets are not interchangeable.",
        },
        { type: "h3", text: "11.3 Transaction verification" },
        {
          type: "p",
          text: "A transaction should be considered complete only after the application verifies the relevant network result. A transaction hash or identifier is useful for investigation, but its existence alone is not proof of successful settlement.",
        },
        { type: "h3", text: "11.4 Contract and deployment information" },
        {
          type: "p",
          text: "Before production use, publish the official contract addresses, supported network identifiers, source repositories, deployment status, audit status, and upgrade or admin controls, only where those details exist and have been verified. Never rely on an address copied from an untrusted message.",
        },
      ],
    },
    {
      id: "security-model",
      number: "12",
      title: "Security Model",
      group: "Network and security",
      blocks: [
        {
          type: "p",
          text: "Automa's security depends on the complete system: wallet design, key management, policy enforcement, agent credentials, integrations, infrastructure, and user behavior. No single dashboard or policy feature can eliminate every risk.",
        },
        { type: "h3", text: "12.1 Threats to consider" },
        {
          type: "list",
          items: [
            "Prompt injection that attempts to persuade an agent to make an unauthorized payment.",
            "A compromised agent runtime or connector.",
            "Stolen API credentials or session tokens.",
            "A malicious or impersonated service provider.",
            "Bugs in policy evaluation or budget accounting.",
            "Duplicate requests caused by retries or concurrency.",
            "A compromised administrator account.",
            "Incorrect network or recipient selection.",
            "Smart-contract vulnerabilities.",
            "Phishing and fake Automa interfaces.",
            "Denial of service or unavailable RPC infrastructure.",
          ],
        },
        { type: "h3", text: "12.2 Defense-in-depth" },
        { type: "p", text: "Recommended safeguards include:" },
        {
          type: "list",
          items: [
            "Separate agent funds from personal holdings.",
            "Apply strict per-transaction and cumulative budgets.",
            "Verify destinations and supported assets.",
            "Require human approval for sensitive actions.",
            "Use least-privilege, revocable agent credentials.",
            "Avoid exposing private keys to model prompts or agent logs.",
            "Protect dashboard sessions with strong authentication.",
            "Rate-limit requests and detect repeated failures.",
            "Use idempotency controls and concurrency-safe budget accounting.",
            "Monitor transaction state independently of agent claims.",
            "Test policy bypasses and edge cases.",
            "Obtain appropriate independent security review before handling meaningful funds.",
          ],
        },
        {
          type: "p",
          text: "These are recommendations for the product's security design; they should not be read as confirmation that every safeguard is currently implemented.",
        },
        { type: "h3", text: "12.3 Private keys and secrets" },
        {
          type: "p",
          text: "A seed phrase or private key provides powerful control over assets. It must never be pasted into an AI prompt, source repository, analytics event, support ticket, or ordinary application log. Use secure signing and key-management patterns appropriate to the actual custody model.",
        },
        { type: "h3", text: "12.4 Smart-contract safety" },
        {
          type: "p",
          text: "Any contract that holds or moves funds should receive careful testing and independent review before production use. Tests should include unauthorized callers, boundary amounts, unusual token behavior, re-entrancy where relevant, failed external calls, upgrade controls, and unexpected state transitions. An audit is not a guarantee of safety and must not be claimed unless it has actually occurred.",
        },
        { type: "h3", text: "12.5 Emergency response" },
        {
          type: "p",
          text: "A documented response process should explain how to pause agents, revoke credentials, disable integrations, stop new requests, investigate pending transactions, and communicate an incident. A pause cannot necessarily reverse a transaction already submitted or confirmed on-chain.",
        },
      ],
    },
    {
      id: "privacy-and-data-handling",
      number: "13",
      title: "Privacy and Data Handling",
      group: "Network and security",
      blocks: [
        {
          type: "p",
          text: "Financial activity may reveal a user's business relationships, service usage, and operational patterns. Automa should minimize unnecessary data collection and clearly explain what is stored.",
        },
        { type: "h3", text: "13.1 On-chain visibility" },
        {
          type: "p",
          text: "Public blockchain activity may be visible to anyone who can inspect the network. Wallet addresses are not the same as legal identities, but transactions can sometimes be linked to people or organizations through external information.",
        },
        { type: "h3", text: "13.2 Application data" },
        {
          type: "p",
          text: "The application may need to store agent identifiers, policy settings, request metadata, transaction references, and activity history. The actual data collected, retention period, storage location, and access controls should be documented in the deployed product's privacy policy.",
        },
        { type: "h3", text: "13.3 Secrets and prompts" },
        {
          type: "p",
          text: "Private keys, seed phrases, passwords, access tokens, and confidential prompts should not be included in ordinary analytics or logs. Logs should redact sensitive data and be accessible only to authorized personnel.",
        },
        { type: "h3", text: "13.4 User control" },
        {
          type: "p",
          text: "Where supported, users should be able to disconnect agents, revoke credentials, and request deletion of off-chain account data subject to legal, operational, and security requirements. Deleting application data does not remove public blockchain records.",
        },
      ],
    },
    {
      id: "failure-handling-and-recovery",
      number: "14",
      title: "Failure Handling and Recovery",
      group: "Network and security",
      blocks: [
        {
          type: "p",
          text: "A reliable payment system must communicate uncertainty honestly and avoid turning transient errors into duplicate payments.",
        },
        {
          type: "defs",
          items: [
            { term: "14.1 Insufficient funds", text: "Reject the request or return a clear insufficient-funds status. Include fee requirements in the calculation when possible. Do not repeatedly retry an impossible payment." },
            { term: "14.2 Policy rejection", text: "Explain which policy category caused the rejection without exposing sensitive internal rules unnecessarily. The agent should receive a structured outcome so it can choose a permitted alternative or ask the user." },
            { term: "14.3 Human approval timeout", text: "If approval is not received within the defined period, the request should expire or remain pending according to a clearly stated policy. It should not automatically become approved." },
            { term: "14.4 Network delay", text: "Keep the transaction pending while checking the network. Do not submit another payment simply because confirmation is slow." },
            { term: "14.5 RPC or service outage", text: "Use retry limits and backoff for temporary failures. Preserve the original request identifier so retries can be correlated with the same operation." },
            { term: "14.6 Unknown transaction outcome", text: "If a request was submitted but the response was lost, look up its status before retrying. Show an explicit unknown or pending state until the result can be verified." },
            { term: "14.7 Compromised agent", text: "Pause the agent, revoke its credentials, review recent requests and transactions, and assess whether other agents or services share the same credential. Move remaining funds only through a verified wallet procedure if necessary." },
          ],
        },
      ],
    },
    {
      id: "use-cases",
      number: "15",
      title: "Use Cases",
      group: "Use and risk",
      blocks: [
        { type: "h3", text: "15.1 Paying for API usage" },
        {
          type: "p",
          text: "A research agent needs a paid data API. The user allows payments only to a verified provider and sets a daily budget. The agent submits a request; Automa checks the recipient, amount, and remaining budget before the payment can proceed.",
        },
        { type: "h3", text: "15.2 Autonomous software development" },
        {
          type: "p",
          text: "A coding agent needs compute, testing services, or a deployment resource. Its wallet is restricted to approved providers and a small task budget. Unexpected or high-value charges require human review.",
        },
        { type: "h3", text: "15.3 Data and research workflows" },
        {
          type: "p",
          text: "A data agent purchases access to a dataset or specialized analysis service. The payment request includes a service reference, while the policy controls the maximum amount and allowed recipient.",
        },
        { type: "h3", text: "15.4 Multi-agent operations" },
        {
          type: "p",
          text: "A user operates several specialized agents. Each agent has a separate budget and permissions, helping the user understand which workflow spent funds and reducing the risk that one compromised agent can consume the entire allocation.",
        },
        { type: "h3", text: "15.5 Machine-to-machine services" },
        {
          type: "p",
          text: "A software service provides a paid capability to another software agent. Automa's longer-term direction is to help make the payment and authorization side of such exchanges more structured, subject to compatible provider integrations and reliable service identity.",
        },
        {
          type: "note",
          label: "Illustrative",
          text: "These are illustrative workflows, not claims that every named type of integration is currently available. Availability depends on the deployed wallet, policy controls, service adapters, and network support.",
        },
      ],
    },
    {
      id: "developer-concepts",
      number: "16",
      title: "Developer Concepts",
      group: "Integration",
      blocks: [
        {
          type: "p",
          text: "This section describes the conceptual shape of an integration. It is not a production SDK reference and does not define real Automa endpoints.",
        },
        { type: "h3", text: "16.1 Suggested request fields" },
        { type: "p", text: "A payment request may contain:" },
        {
          type: "table",
          head: ["Field", "Purpose"],
          rows: [
            ["`request_id`", "Unique identifier used to track and deduplicate the request."],
            ["`agent_id`", "Identifies the requesting agent."],
            ["`recipient`", "Verified destination identifier."],
            ["`network`", "Network on which the payment is intended."],
            ["`asset`", "Token or asset identifier."],
            ["`amount`", "Requested amount in a well-defined unit."],
            ["`purpose`", "Human-readable reason for the payment."],
            ["`service_reference`", "Optional identifier for the service or invoice."],
            ["`created_at`", "Request creation time."],
            ["`expires_at`", "Optional request expiry."],
            ["`idempotency_key`", "Key used to prevent duplicate execution."],
          ],
        },
        {
          type: "p",
          text: "The production schema must specify data types, validation rules, decimal handling, authentication, and versioning.",
        },
        { type: "h3", text: "16.2 Suggested response fields" },
        {
          type: "p",
          text: "A response may return a request identifier, current status, policy decision, a safe-to-display reason, approval requirement, and transaction reference if one exists. It should never return private keys or secrets.",
        },
        { type: "h3", text: "16.3 Validation requirements" },
        {
          type: "p",
          text: "A developer integration should validate amount format, supported assets, network identity, recipient format, agent authorization, request expiry, and idempotency. The server or contract, not the agent's natural-language reasoning, must be authoritative for permission enforcement.",
        },
        { type: "h3", text: "16.4 Error categories" },
        { type: "p", text: "Useful structured errors include:" },
        {
          type: "list",
          items: [
            "`INVALID_REQUEST`",
            "`UNAUTHORIZED_AGENT`",
            "`AGENT_PAUSED`",
            "`UNSUPPORTED_NETWORK`",
            "`UNSUPPORTED_ASSET`",
            "`RECIPIENT_NOT_ALLOWED`",
            "`POLICY_LIMIT_EXCEEDED`",
            "`INSUFFICIENT_FUNDS`",
            "`APPROVAL_REQUIRED`",
            "`REQUEST_EXPIRED`",
            "`DUPLICATE_REQUEST`",
            "`NETWORK_PENDING`",
            "`TRANSACTION_FAILED`",
            "`SERVICE_UNAVAILABLE`",
          ],
        },
        {
          type: "p",
          text: "These are suggested names for documentation and design. They are not guaranteed to match an existing API.",
        },
      ],
    },
    {
      id: "illustrative-api-and-workflow-examples",
      number: "17",
      title: "Illustrative API and Workflow Examples",
      group: "Integration",
      blocks: [
        {
          type: "note",
          label: "Not a working API",
          text: "The following examples are pseudocode for explaining the product model. They are not working Automa API calls and must not be used as if a public endpoint or SDK has been released.",
        },
        { type: "h3", text: "17.1 Example payment request" },
        {
          type: "code",
          lang: "json",
          text: `{
  "request_id": "req_example_001",
  "agent_id": "research-agent",
  "network": "near",
  "asset": "SUPPORTED_ASSET_IDENTIFIER",
  "recipient": "VERIFIED_RECIPIENT_IDENTIFIER",
  "amount": "2.00",
  "purpose": "Purchase approved research API credits",
  "service_reference": "invoice_example_123",
  "idempotency_key": "unique-operation-key"
}`,
        },
        {
          type: "p",
          text: "In a real implementation, the asset identifier, amount precision, recipient format, authentication, and network identifier must follow the actual schema. Never replace a verified destination with an arbitrary address from an agent's output.",
        },
        { type: "h3", text: "17.2 Example policy" },
        {
          type: "code",
          lang: "json",
          text: `{
  "agent_id": "research-agent",
  "enabled": true,
  "max_per_payment": "2.00",
  "budget_period": "daily",
  "budget_limit": "10.00",
  "approved_recipients": [
    "VERIFIED_PROVIDER_IDENTIFIER"
  ],
  "require_human_approval_for_new_recipients": true
}`,
        },
        {
          type: "p",
          text: "This illustrates the intent of a policy. It does not imply that these exact fields are currently supported by Automa.",
        },
        { type: "h3", text: "17.3 Example decision flow" },
        {
          type: "code",
          lang: "text",
          text: `receive payment request
  -> authenticate agent
  -> validate request and expiry
  -> check duplicate/idempotency key
  -> verify network, asset, and recipient
  -> evaluate transaction limit and remaining budget
  -> check balance and estimated fees
  -> if human approval is required: wait for approval
  -> if rejected: return a clear rejection status
  -> if authorized: submit through the supported wallet flow
  -> track network result
  -> record the final verified status`,
        },
        { type: "h3", text: "17.4 Integration checklist" },
        { type: "p", text: "Before connecting an agent:" },
        {
          type: "olist",
          items: [
            "Confirm the official integration method and network.",
            "Verify that the agent has a unique identity.",
            "Start with a small budget and a narrow recipient allowlist.",
            "Confirm how authorization is enforced.",
            "Test duplicate requests and timeout recovery.",
            "Test policy rejection and human approval.",
            "Confirm how to pause the agent and revoke credentials.",
            "Check how transaction status is verified.",
            "Ensure secrets are never placed in model prompts or logs.",
            "Test with a test network or small amount before production use.",
          ],
        },
      ],
    },
    {
      id: "limitations-and-risks",
      number: "18",
      title: "Limitations and Risks",
      group: "Use and risk",
      blocks: [
        {
          type: "p",
          text: "Automa is intended to make agent payments more controlled, not risk-free.",
        },
        {
          type: "defs",
          items: [
            { term: "Agent mistakes", text: "An agent may request a payment for the wrong service or misunderstand a task." },
            { term: "Prompt injection", text: "Malicious content may attempt to manipulate the agent's decisions." },
            { term: "Credential compromise", text: "Stolen credentials can be used within whatever authority they retain." },
            { term: "Smart-contract bugs", text: "On-chain code may contain vulnerabilities." },
            { term: "Service fraud", text: "A recipient may be malicious, unavailable, or fail to deliver what was purchased." },
            { term: "Irreversible transfers", text: "Confirmed blockchain payments generally cannot be cancelled by Automa." },
            { term: "Network costs and delays", text: "Fees and confirmation times may vary." },
            { term: "Asset volatility", text: "Token values can change, and a token may have liquidity or market risks." },
            { term: "Off-chain enforcement limits", text: "Server-side rules may not protect funds if a separate unrestricted key is compromised." },
            { term: "Integration coverage", text: "A service can only be paid through supported and compatible payment flows." },
            { term: "Regulatory considerations", text: "Financial, tax, sanctions, consumer-protection, and data obligations vary by jurisdiction and use case." },
          ],
        },
        {
          type: "note",
          label: "Advice",
          text: "Users should begin with low-value experiments, verify recipients independently, and avoid allocating funds they cannot afford to lose.",
        },
      ],
    },
    {
      id: "roadmap-considerations",
      number: "19",
      title: "Roadmap Considerations",
      group: "Use and risk",
      blocks: [
        {
          type: "p",
          text: "The following are potential development milestones, not promises about delivery dates or current availability.",
        },
        { type: "h3", text: "Foundation" },
        {
          type: "list",
          items: [
            "Reliable wallet connection and network selection.",
            "Clear funding, balance, and transaction history.",
            "Agent registration and revocation.",
            "Basic per-transaction and cumulative spending limits.",
          ],
        },
        { type: "h3", text: "Policy and oversight" },
        {
          type: "list",
          items: [
            "Approved-recipient controls.",
            "Human approval flows.",
            "Budget reservations for pending requests.",
            "Better audit history and policy explanations.",
            "Safe pause and emergency-revocation controls.",
          ],
        },
        { type: "h3", text: "Developer experience" },
        {
          type: "list",
          items: [
            "Documented, versioned API or SDK where released.",
            "Agent framework examples and integration guides.",
            "Webhooks or another reliable transaction-status notification method.",
            "Sandbox and test-network workflows.",
            "Clear error codes and idempotency semantics.",
          ],
        },
        { type: "h3", text: "Ecosystem" },
        {
          type: "list",
          items: [
            "Service-provider integrations.",
            "Machine-readable service pricing and identity.",
            "Cross-agent budget management.",
            "Analytics and configurable risk alerts.",
            "Additional network or asset support only when technically and operationally validated.",
          ],
        },
        {
          type: "note",
          label: "Status labels",
          text: "Roadmap items should be marked as planned, in development, available in test environments, or available in production based on verified project status.",
        },
      ],
    },
    {
      id: "faq",
      number: "20",
      title: "FAQ",
      group: "Reference",
      blocks: [
        { type: "h3", text: "What is Automa?" },
        {
          type: "p",
          text: "Automa is a project focused on programmable financial infrastructure for autonomous AI agents. It aims to let agents request and make eligible digital-service payments within user-defined limits.",
        },
        { type: "h3", text: "Why do AI agents need wallets?" },
        {
          type: "p",
          text: "Agents may need to purchase compute, API calls, datasets, or other digital services. A dedicated wallet can separate that operational budget from a user's main holdings.",
        },
        { type: "h3", text: "Can an agent spend all the funds in my wallet?" },
        {
          type: "p",
          text: "The intended model is bounded spending, with explicit limits and permissions. The actual guarantee depends on how authorization is enforced and whether the agent has access to any unrestricted signing capability. Never fund an agent or grant permissions without understanding that design.",
        },
        { type: "h3", text: "Can I restrict which services an agent pays?" },
        {
          type: "p",
          text: "Recipient allowlists and service restrictions are core policy concepts. Check the current implementation to confirm which restrictions are available and how they are enforced.",
        },
        { type: "h3", text: "Can I stop an agent?" },
        {
          type: "p",
          text: "The intended design includes the ability to pause an agent or revoke its permissions. Revocation should prevent future authorized activity where enforced, but it cannot necessarily reverse transactions already submitted or confirmed.",
        },
        { type: "h3", text: "Does Automa custody my funds?" },
        {
          type: "p",
          text: "Custody depends on the wallet and signing architecture used by the actual deployment. Read the current security and wallet documentation before funding an account. Do not assume that a wallet is custodial or non-custodial without verified implementation details.",
        },
        { type: "h3", text: "Does Automa support NEAR?" },
        {
          type: "p",
          text: "NEAR Protocol is the project's network focus. Confirm the current supported network, deployment environment, assets, and contract details in the official project interface or release documentation.",
        },
        { type: "h3", text: "Are payments reversible?" },
        {
          type: "p",
          text: "Confirmed blockchain transactions are generally irreversible. A refund may require a separate transaction or a provider-specific refund process.",
        },
        { type: "h3", text: "Does approval mean the payment is complete?" },
        {
          type: "p",
          text: "No. Approval means the request passed the required authorization step. Submission and network confirmation are separate stages.",
        },
        { type: "h3", text: "Is Automa audited?" },
        {
          type: "p",
          text: "Use only a verified, published audit statement from the project. This document does not claim that the product or any contract has been audited.",
        },
        { type: "h3", text: "Can any API or service be paid automatically?" },
        {
          type: "p",
          text: "Only where the service's payment method, recipient identity, asset, and integration are compatible with the current implementation and the user's policies.",
        },
        { type: "h3", text: "Is Automa production-ready?" },
        {
          type: "p",
          text: "Production readiness must be established from the actual release, security review, deployment status, supported integrations, and operational documentation. This overview alone is not a production-readiness guarantee.",
        },
      ],
    },
    {
      id: "glossary",
      number: "21",
      title: "Glossary",
      group: "Reference",
      blocks: [
        {
          type: "defs",
          items: [
            { term: "Agent", text: "Software that performs tasks and may request eligible payments." },
            { term: "Agentic economy", text: "An emerging environment in which software agents perform work, coordinate with services, and may transact programmatically." },
            { term: "Agent wallet", text: "A wallet or financial context allocated to an agent's permitted operations." },
            { term: "Allowlist", text: "A list of destinations or actions explicitly permitted by policy." },
            { term: "Audit trail", text: "A record of requests, decisions, and transaction outcomes." },
            { term: "Budget", text: "A spending allowance for a period, task, or agent." },
            { term: "Custody", text: "The arrangement that determines who controls the assets and signing authority." },
            { term: "Idempotency", text: "A property that allows a repeated request to be handled without unintentionally repeating the financial action." },
            { term: "On-chain", text: "Recorded or enforced on a blockchain." },
            { term: "Off-chain", text: "Handled outside the blockchain, such as by a web server or agent runtime." },
            { term: "Policy engine", text: "The component that evaluates a proposed action against configured rules." },
            { term: "Recipient", text: "The account or service receiving a payment." },
            { term: "Revocation", text: "Removing an agent's permission or credential so it can no longer perform the previously authorized actions." },
            { term: "Smart contract", text: "Code deployed to a blockchain that executes according to its programmed logic." },
            { term: "Transaction confirmation", text: "Verification that the network has processed a submitted transaction to the required level." },
            { term: "Least privilege", text: "Giving each component only the permissions necessary for its job." },
          ],
        },
      ],
    },
    {
      id: "responsible-use",
      number: "22",
      title: "Responsible Use",
      group: "Reference",
      blocks: [
        {
          type: "p",
          text: "Automa's goal is to make agent-driven payments more manageable by placing explicit rules and visibility around financial activity. Users remain responsible for configuring sensible limits, checking destinations, protecting credentials, and understanding the risks of blockchain transactions.",
        },
        {
          type: "note",
          label: "Core rule",
          text: "Keep **reasoning separate from authority**: an AI agent may explain why it wants to make a payment, but the final authorization must be determined by a trusted policy and signing system, not by the agent's own claim that the payment is safe.",
        },
        {
          type: "p",
          text: "Before using Automa with meaningful funds, verify the current release, supported network and assets, wallet custody model, policy-enforcement mechanism, contract addresses, and security disclosures from official project materials.",
        },
      ],
    },
  ] satisfies DocSection[],
};
