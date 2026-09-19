import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { Opportunity } from "../../types";

// Fallback memory store
const memoryStore: Opportunity[] = [];

// Initialize DynamoDB Client
// We assume AWS CLI is configured locally or IAM roles are present in production
const region = process.env.AWS_REGION || "ap-south-1";
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || "FukoOpportunities";

// Set to true by default to attempt DB connection
const useDatabase = process.env.USE_MOCK_DB !== "true";

let ddbDocClient: DynamoDBDocumentClient | null = null;

if (useDatabase) {
  try {
    const client = new DynamoDBClient({ region });
    ddbDocClient = DynamoDBDocumentClient.from(client);
  } catch (err) {
    console.error("Failed to initialize DynamoDB Client:", err);
  }
}

export async function saveOpportunities(opportunities: Opportunity[]): Promise<void> {
  if (!ddbDocClient) {
    console.log("AWS credentials not found, using memory store for saveOpportunities");
    
    // Update memory store (upsert)
    for (const opp of opportunities) {
      const idx = memoryStore.findIndex(mo => mo.id === opp.id);
      if (idx !== -1) {
        memoryStore[idx] = opp;
      } else {
        memoryStore.push(opp);
      }
    }
    return;
  }

  // DynamoDB save
  try {
    const promises = opportunities.map((opp) => {
      const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: opp,
      });
      return ddbDocClient!.send(command);
    });
    
    await Promise.all(promises);
  } catch (error) {
    console.error("Error saving to DynamoDB:", error);
    throw error;
  }
}

export async function getOpportunities(): Promise<Opportunity[]> {
  if (!ddbDocClient) {
    console.log("AWS credentials not found, using memory store for getOpportunities");
    return memoryStore;
  }

  try {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
    });
    const response = await ddbDocClient.send(command);
    return (response.Items as Opportunity[]) || [];
  } catch (error) {
    console.error("Error fetching from DynamoDB:", error);
    // fallback if table doesn't exist etc.
    return memoryStore;
  }
}

export async function getOpportunityById(id: string): Promise<Opportunity | null> {
  if (!ddbDocClient) {
    return memoryStore.find(o => o.id === id) || null;
  }

  try {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { id },
    });
    const response = await ddbDocClient.send(command);
    return (response.Item as Opportunity) || null;
  } catch (error) {
    console.error(`Error fetching opportunity ${id} from DynamoDB:`, error);
    return null;
  }
}
