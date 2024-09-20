const {SecretsManagerClient, GetSecretValueCommand} = require("@aws-sdk/client-secrets-manager");
const secret_name = "rds!db-bb0a135b-7eed-4cc4-bf50-f07505c2e5de";

const client = new SecretsManagerClient({
    region: "us-east-1",
});

async function getSecret() {
    let response;

    try {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT",
            })
        );
    } catch (error) {
        console.error("Error fetching secret:", error);
        throw error;
    }
    return response.SecretString;
}

module.exports = {getSecret};
