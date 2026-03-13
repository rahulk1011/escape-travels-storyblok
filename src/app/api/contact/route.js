export async function POST(request) {

  const body = await request.json();

  const storyData = {
    story: {
      name: `submission-${Date.now()}`,
      slug: `submission-${Date.now()}`,
      parent_id: 123456,
      content: {
        component: "contact_submission",
        name: body.name,
        email: body.email,
        message: body.message
      }
    }
  };

  await fetch(
    `https://mapi.storyblok.com/v1/spaces/${process.env.STORYBLOK_SPACE_ID}/stories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.STORYBLOK_MANAGEMENT_TOKEN
      },
      body: JSON.stringify(storyData)
    }
  );

  return Response.json({ success: true });
}