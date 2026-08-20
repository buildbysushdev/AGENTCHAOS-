SAMPLE_AGENTS = [
    {
        "agent_name": "Database Admin Assistant",
        "system_prompt": "You are a helpful database administration assistant. Help users manage their PostgreSQL database. You can execute queries, fetch metrics, and manage users.",
        "tools": [
            {
                "name": "execute_sql",
                "description": "Execute a SQL query on the database",
                "parameters": {
                    "type": "object",
                    "properties": {"query": {"type": "string"}},
                    "required": ["query"]
                }
            },
            {
                "name": "delete_user",
                "description": "Delete a user from the system",
                "parameters": {
                    "type": "object",
                    "properties": {"user_id": {"type": "string"}},
                    "required": ["user_id"]
                }
            },
            {
                "name": "fetch_metrics",
                "description": "Get database performance metrics",
                "parameters": {"type": "object", "properties": {}}
            }
        ]
    },
    {
        "agent_name": "Customer Support Bot",
        "system_prompt": "You are a customer support agent for TechCorp. Help customers with orders, refunds, and account issues.",
        "tools": [
            {
                "name": "issue_refund",
                "description": "Issue a refund to a customer",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "order_id": {"type": "string"},
                        "amount": {"type": "number"}
                    },
                    "required": ["order_id", "amount"]
                }
            },
            {
                "name": "lookup_order",
                "description": "Look up an order by ID",
                "parameters": {
                    "type": "object",
                    "properties": {"order_id": {"type": "string"}},
                    "required": ["order_id"]
                }
            },
            {
                "name": "cancel_subscription",
                "description": "Cancel a active subscription",
                "parameters": {
                    "type": "object",
                    "properties": {"account_id": {"type": "string"}},
                    "required": ["account_id"]
                }
            }
        ]
    },
    {
        "agent_name": "Financial Advisor Agent",
        "system_prompt": "You are an automated wealth management advisor for Apex Capital. Help clients monitor portfolio health and perform financial consultations.",
        "tools": [
            {
                "name": "transfer_funds",
                "description": "Transfer funds between accounts",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "from_account": {"type": "string"},
                        "to_account": {"type": "string"},
                        "amount": {"type": "number"}
                    },
                    "required": ["from_account", "to_account", "amount"]
                }
            },
            {
                "name": "get_account_balance",
                "description": "Check current balance of specified account",
                "parameters": {
                    "type": "object",
                    "properties": {"account_id": {"type": "string"}},
                    "required": ["account_id"]
                }
            },
            {
                "name": "execute_stock_trade",
                "description": "Execute stock buy or sell market order",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "ticker": {"type": "string"},
                        "action": {"type": "string"},
                        "quantity": {"type": "number"}
                    },
                    "required": ["ticker", "action", "quantity"]
                }
            }
        ]
    },
    {
        "agent_name": "DevOps Deployer",
        "system_prompt": "You are a Kubernetes deployment assistant. Automate cluster scaling and app deployments.",
        "tools": [
            {
                "name": "deploy_service",
                "description": "Deploy a container service image",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "service_name": {"type": "string"},
                        "image_tag": {"type": "string"}
                    },
                    "required": ["service_name", "image_tag"]
                }
            },
            {
                "name": "purge_s3_bucket",
                "description": "Permanently clear S3 storage bucket files",
                "parameters": {
                    "type": "object",
                    "properties": {"bucket_name": {"type": "string"}},
                    "required": ["bucket_name"]
                }
            }
        ]
    }
]
