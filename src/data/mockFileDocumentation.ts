import { FileTree, DocumentedFile } from "@/types/fileDocumentation";

const apiEndpointsFile: DocumentedFile = {
  id: "api-endpoints",
  name: "endpoints.py",
  path: "api/endpoints.py",
  functions: [
    {
      name: "process_payment",
      description: "Process a payment transaction through the payment gateway.",
      parameters: [
        {
          name: "payment_data",
          type: "dict",
          description: "Dictionary containing payment information including amount, currency, and payment method",
        },
        {
          name: "customer_id",
          type: "str",
          description: "Unique identifier for the customer making the payment",
        },
        {
          name: "idempotency_key",
          type: "str",
          description: "Unique key to prevent duplicate payment processing",
        },
      ],
      returns: {
        type: "dict",
        description: "Dictionary containing transaction_id, status, and payment details",
      },
      examples: [
        `payment_data = {'amount': 100.00, 'currency': 'USD', 'method': 'credit_card'}
result = process_payment(payment_data, 'cust_123', 'unique_key_456')`,
      ],
    },
    {
      name: "validate_payment_method",
      description: "Validate the provided payment method and ensure it is supported.",
      parameters: [
        {
          name: "method",
          type: "str",
          description: "Payment method to validate (e.g., credit_card, bank_transfer, paypal)",
        },
        {
          name: "region",
          type: "str",
          description: "Geographic region for payment method availability check",
        },
      ],
      returns: {
        type: "bool",
        description: "True if the payment method is valid and supported in the region, False otherwise",
      },
    },
  ],
};

const apiValidatorsFile: DocumentedFile = {
  id: "api-validators",
  name: "validators.py",
  path: "api/validators.py",
  functions: [
    {
      name: "validate_amount",
      description: "Validate that the payment amount is within acceptable limits.",
      parameters: [
        {
          name: "amount",
          type: "float",
          description: "The payment amount to validate",
        },
        {
          name: "currency",
          type: "str",
          description: "Currency code (e.g., USD, EUR)",
        },
      ],
      returns: {
        type: "ValidationResult",
        description: "Object containing validation status and any error messages",
      },
    },
    {
      name: "validate_customer",
      description: "Validate customer information before processing payment.",
      parameters: [
        {
          name: "customer_id",
          type: "str",
          description: "Unique identifier for the customer",
        },
      ],
      returns: {
        type: "bool",
        description: "True if customer exists and is in good standing",
      },
    },
  ],
};

const middlewareFile: DocumentedFile = {
  id: "api-middleware",
  name: "middleware.py",
  path: "api/middleware.py",
  functions: [
    {
      name: "authenticate_request",
      description: "Authenticate incoming API requests using JWT tokens.",
      parameters: [
        {
          name: "request",
          type: "Request",
          description: "The incoming HTTP request object",
        },
      ],
      returns: {
        type: "AuthResult",
        description: "Authentication result containing user info or error",
      },
    },
    {
      name: "rate_limit",
      description: "Apply rate limiting to prevent API abuse.",
      parameters: [
        {
          name: "client_ip",
          type: "str",
          description: "IP address of the client making the request",
        },
        {
          name: "endpoint",
          type: "str",
          description: "The API endpoint being accessed",
        },
      ],
      returns: {
        type: "bool",
        description: "True if request is within rate limits, False if throttled",
      },
    },
  ],
};

const paymentProcessorFile: DocumentedFile = {
  id: "core-payment-processor",
  name: "payment_processor.py",
  path: "core/payment_processor.py",
  functions: [
    {
      name: "create_transaction",
      description: "Create a new payment transaction record in the database.",
      parameters: [
        {
          name: "payment_data",
          type: "PaymentData",
          description: "Validated payment data object",
        },
        {
          name: "processor",
          type: "str",
          description: "Payment processor to use (stripe, paypal, etc.)",
        },
      ],
      returns: {
        type: "Transaction",
        description: "Created transaction object with ID and status",
      },
      examples: [
        `transaction = create_transaction(payment_data, 'stripe')
print(f"Transaction ID: {transaction.id}")`,
      ],
    },
    {
      name: "process_refund",
      description: "Process a refund for a previously completed transaction.",
      parameters: [
        {
          name: "transaction_id",
          type: "str",
          description: "ID of the original transaction to refund",
        },
        {
          name: "amount",
          type: "float",
          description: "Amount to refund (partial refunds supported)",
        },
        {
          name: "reason",
          type: "str",
          description: "Reason for the refund request",
        },
      ],
      returns: {
        type: "RefundResult",
        description: "Refund result with new transaction ID and status",
      },
    },
    {
      name: "get_transaction_status",
      description: "Retrieve the current status of a transaction.",
      parameters: [
        {
          name: "transaction_id",
          type: "str",
          description: "ID of the transaction to check",
        },
      ],
      returns: {
        type: "TransactionStatus",
        description: "Current status and metadata of the transaction",
      },
    },
  ],
};

const authHandlerFile: DocumentedFile = {
  id: "core-auth-handler",
  name: "auth_handler.py",
  path: "core/auth_handler.py",
  functions: [
    {
      name: "generate_token",
      description: "Generate a new JWT token for authenticated users.",
      parameters: [
        {
          name: "user_id",
          type: "str",
          description: "Unique identifier of the user",
        },
        {
          name: "permissions",
          type: "list[str]",
          description: "List of permission scopes for the token",
        },
      ],
      returns: {
        type: "str",
        description: "Signed JWT token string",
      },
    },
    {
      name: "verify_token",
      description: "Verify and decode a JWT token.",
      parameters: [
        {
          name: "token",
          type: "str",
          description: "JWT token to verify",
        },
      ],
      returns: {
        type: "TokenPayload",
        description: "Decoded token payload if valid, raises exception otherwise",
      },
    },
  ],
};

const databaseFile: DocumentedFile = {
  id: "core-database",
  name: "database.py",
  path: "core/database.py",
  functions: [
    {
      name: "connect",
      description: "Establish a connection to the database.",
      parameters: [
        {
          name: "connection_string",
          type: "str",
          description: "Database connection string with credentials",
        },
      ],
      returns: {
        type: "Connection",
        description: "Database connection object",
      },
    },
    {
      name: "execute_query",
      description: "Execute a parameterized SQL query.",
      parameters: [
        {
          name: "query",
          type: "str",
          description: "SQL query string with placeholders",
        },
        {
          name: "params",
          type: "tuple",
          description: "Query parameters to bind",
        },
      ],
      returns: {
        type: "QueryResult",
        description: "Query result with rows and metadata",
      },
    },
  ],
};

const helpersFile: DocumentedFile = {
  id: "utils-helpers",
  name: "helpers.py",
  path: "utils/helpers.py",
  functions: [
    {
      name: "format_currency",
      description: "Format a numeric amount as a currency string.",
      parameters: [
        {
          name: "amount",
          type: "float",
          description: "Numeric amount to format",
        },
        {
          name: "currency",
          type: "str",
          description: "Currency code (e.g., USD, EUR)",
        },
      ],
      returns: {
        type: "str",
        description: "Formatted currency string (e.g., '$100.00')",
      },
    },
    {
      name: "generate_idempotency_key",
      description: "Generate a unique idempotency key for payment requests.",
      parameters: [],
      returns: {
        type: "str",
        description: "UUID-based unique key string",
      },
    },
    {
      name: "mask_card_number",
      description: "Mask a credit card number for display purposes.",
      parameters: [
        {
          name: "card_number",
          type: "str",
          description: "Full credit card number",
        },
      ],
      returns: {
        type: "str",
        description: "Masked card number (e.g., '****-****-****-1234')",
      },
    },
  ],
};

const utilsValidatorsFile: DocumentedFile = {
  id: "utils-validators",
  name: "validators.py",
  path: "utils/validators.py",
  functions: [
    {
      name: "is_valid_email",
      description: "Validate an email address format.",
      parameters: [
        {
          name: "email",
          type: "str",
          description: "Email address to validate",
        },
      ],
      returns: {
        type: "bool",
        description: "True if email format is valid",
      },
    },
    {
      name: "is_valid_card_number",
      description: "Validate a credit card number using Luhn algorithm.",
      parameters: [
        {
          name: "card_number",
          type: "str",
          description: "Credit card number to validate",
        },
      ],
      returns: {
        type: "bool",
        description: "True if card number passes Luhn check",
      },
    },
  ],
};

export const mockFileTrees: Record<string, FileTree> = {
  "1": {
    projectId: "1",
    folders: [
      {
        name: "api",
        path: "api",
        files: [apiEndpointsFile, apiValidatorsFile, middlewareFile],
        subfolders: [],
      },
      {
        name: "core",
        path: "core",
        files: [paymentProcessorFile, authHandlerFile, databaseFile],
        subfolders: [],
      },
      {
        name: "utils",
        path: "utils",
        files: [helpersFile, utilsValidatorsFile],
        subfolders: [],
      },
    ],
    rootFiles: [],
  },
  "5": {
    projectId: "5",
    folders: [
      {
        name: "api",
        path: "api",
        files: [apiEndpointsFile, apiValidatorsFile, middlewareFile],
        subfolders: [],
      },
      {
        name: "core",
        path: "core",
        files: [paymentProcessorFile, authHandlerFile, databaseFile],
        subfolders: [],
      },
      {
        name: "utils",
        path: "utils",
        files: [helpersFile, utilsValidatorsFile],
        subfolders: [],
      },
    ],
    rootFiles: [],
  },
};

export const getAllFiles = (tree: FileTree): DocumentedFile[] => {
  const files: DocumentedFile[] = [...tree.rootFiles];
  
  const collectFromFolder = (folder: { files: DocumentedFile[]; subfolders: typeof tree.folders }) => {
    files.push(...folder.files);
    folder.subfolders.forEach(collectFromFolder);
  };
  
  tree.folders.forEach(collectFromFolder);
  return files;
};
