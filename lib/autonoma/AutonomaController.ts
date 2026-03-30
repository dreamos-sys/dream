export const AutonomaConfig = {
  // Kita panggil dari Environment Variables Vercel/Cloudflare
  CLIENT_ID: process.env.NEXT_PUBLIC_AUTONOMA_CLIENT_ID || '',
  CLIENT_SECRET: process.env.AUTONOMA_SECRET_ID || '',
  APP_VERSION_ID: 'cm7dbowr80042waka7thyjhkq'
};

export async function triggerDreamTest(testId: string) {
  if (!AutonomaConfig.CLIENT_SECRET) {
    console.error("🚨 SENSOR ERROR: API HASH MISSING!");
    return { status: 'denied', msg: 'Key not found' };
  }

  try {
    const response = await fetch(`https://autonoma.app/api/test/${testId}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'autonoma-client-id': AutonomaConfig.CLIENT_ID,
        'autonoma-client-secret': AutonomaConfig.CLIENT_SECRET,
      },
      body: JSON.stringify({
        application_version_id: AutonomaConfig.APP_VERSION_ID,
        source: 'api',
        runtime_metadata: {
          "SYSTEM": "Dream OS v2.1",
          "SECURITY": "ISO-27001-Hash",
          "OPERATOR": "Master M"
        }
      }),
    });

    return await response.json();
  } catch (error) {
    return { status: 'failed', msg: 'Neural Connection Interrupted' };
  }
}
