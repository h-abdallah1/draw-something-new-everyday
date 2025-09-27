import { createApi } from 'unsplash-js';
import { NextResponse } from 'next/server';

// Initialize Unsplash API on the server side
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Search for photos using the official Unsplash API
    const result = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 1,
      orientation: 'squarish', // Good for square aspect ratio
    });

    if (result.type === 'success' && result.response.results.length > 0) {
      const photo = result.response.results[0];

      // Track the download as per Unsplash API guidelines
      await unsplash.photos.trackDownload({
        downloadLocation: photo.links.download_location,
      });

      const imageData = {
        id: photo.id,
        url: photo.urls.regular, // Use regular size for good quality
        alt: photo.alt_description || `Photo of ${query}`,
        photographer: photo.user.name,
        photographerUrl: photo.user.links.html,
        downloadLocation: photo.links.download_location,
      };

      return NextResponse.json({ success: true, data: imageData });
    } else {
      return NextResponse.json(
        { error: 'No images found for this search term' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Unsplash API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image from Unsplash' },
      { status: 500 }
    );
  }
}
