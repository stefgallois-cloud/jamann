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

  // Find the 'Texte suggéré' field
  const texteSuggerField = table.fields.find(f => f.name === 'Texte suggéré');
  if (texteSuggerField) {
    console.log(`Renaming 'Texte suggéré' to 'Texte Facebook' (ID: ${texteSuggerField.id})...`);
    const renameRes = await request({
      hostname: 'api.airtable.com',
      path: `/v0/meta/bases/${baseId}/tables/${tableId}/fields/${texteSuggerField.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }, JSON.stringify({ name: "Texte Facebook" }));
    
    if (renameRes.error) {
      console.error("Error renaming field:", renameRes.error);
    } else {
      console.log("Field renamed successfully.");
    }
  } else {
    console.log("'Texte suggéré' field not found, maybe already renamed?");
  }

  // Create new field 'Texte Instagram'
  console.log("Creating 'Texte Instagram' field...");
  const createRes = await request({
    hostname: 'api.airtable.com',
    path: `/v0/meta/bases/${baseId}/tables/${tableId}/fields`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }, JSON.stringify({ name: "Texte Instagram", type: "multilineText" }));

  if (createRes.error) {
    console.error("Error creating field:", createRes.error);
  } else {
    console.log("Field 'Texte Instagram' created successfully.");
  }
}

run();
