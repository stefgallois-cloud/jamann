const https = require('https');

const token = 'patKMig4Cnzdgwqs9.e5fcf1a5e7d06b23573b5584c4fd8f37e608bfc97cbe2a350a94036ed633eacc';
const baseId = 'app6TseIO7Sx4fJqv';
const tableId = 'tbll7zhDjMgihWtly';

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function run() {
  console.log("Fetching table schema...");
  const metaRes = await request({
    hostname: 'api.airtable.com',
    path: `/v0/meta/bases/${baseId}/tables`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const table = metaRes.tables.find(t => t.id === tableId);
  if (!table) {
    console.log("Table not found!");
    return;
  }

  const fieldsToUpdate = [
    {
      name: "Statut",
      type: "singleSelect",
      options: { choices: [ { name: "Prêt à publier", color: "greenLight2" }, { name: "À rédiger", color: "redLight2" } ] }
    },
    {
      name: "Phase",
      type: "singleSelect",
      options: { choices: [ { name: "Annonce", color: "blueLight2" }, { name: "Travaux", color: "orangeLight2" }, { name: "Countdown", color: "purpleLight2" } ] }
    },
    {
      name: "Plateforme",
      type: "singleSelect",
      options: { choices: [ { name: "Facebook + Instagram", color: "cyanLight2" } ] }
    }
  ];

  for (const updateConfig of fieldsToUpdate) {
    const field = table.fields.find(f => f.name === updateConfig.name);
    if (field) {
      console.log(`Updating field ${field.name} (${field.id})...`);
      const updateRes = await request({
        hostname: 'api.airtable.com',
        path: `/v0/meta/bases/${baseId}/tables/${tableId}/fields/${field.id}`,
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }, JSON.stringify(updateConfig));
      
      if (updateRes.error) {
         console.error(`Error updating ${field.name}:`, updateRes.error);
      } else {
         console.log(`${field.name} updated successfully!`);
      }
    }
  }
}

run();
