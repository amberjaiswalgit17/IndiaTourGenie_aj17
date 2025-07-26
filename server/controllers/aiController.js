const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.generateItinerary = async (req, res) => {
  const { location, days, interests, travelStyle = 'mid-range', month = 'unspecified' } = req.body;

  if (!location || !days || !interests) {
    return res.status(400).json({ error: 'Missing required fields: location, days, interests.' });
  }

  const prompt = `
You are a smart travel assistant.

Generate a complete ${days}-day travel itinerary for a trip to ${location}, in the month of ${month}, focusing on the user's interests: ${interests}, and assuming a ${travelStyle} travel style (backpacker/mid-range/luxury).

Instructions:
- Provide exactly ${days} days labeled as "Day 1", "Day 2", etc.
- Break each day into:
  • Morning (breakfast + early activities)
  • Afternoon (lunch + sightseeing)
  • Evening (sunset spots + light activity)
  • Night (dinner + optional cultural/nightlife experiences)
- Keep each activity context-aware (e.g., if it's rainy season, avoid beaches).
- Mention at least one local dish to try per day.
- Ensure it's engaging, helpful, and easy to follow.
`;

  try {
    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'command-r-plus',
        prompt,
        max_tokens: 1200,
        temperature: 0.8,
      }),
    });

    const data = await response.json();

    if (data.generations && data.generations.length > 0) {
      res.json({ itinerary: data.generations[0].text.trim() });
    } else {
      res.status(500).json({ error: 'Itinerary generation failed. Please try again later.' });
    }
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({ error: 'Server error while generating itinerary.' });
  }
};
