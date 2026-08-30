import { algoliasearch } from 'algoliasearch';

const appId =
  import.meta.env.VITE_ALGOLIA_APP_ID ||
  import.meta.env.ALGOLIA_APP_ID ||
  '';

const apiKey =
  import.meta.env.VITE_ALGOLIA_SEARCH_KEY ||
  import.meta.env.ALGOLIA_SEARCH_API_KEY ||
  '';

export const algoliaClient = appId && apiKey ? algoliasearch(appId, apiKey) : null;

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  type: 'program' | 'campaign' | 'document' | 'story';
  url: string;
}

export async function searchFoundationContent(query: string): Promise<SearchResultItem[]> {
  if (!query.trim()) return [];

  // If Algolia credentials exist, perform real-time search
  if (algoliaClient) {
    try {
      const response = await algoliaClient.searchSingleIndex({
        indexName: 'tmf_programs_docs',
        searchParams: { query, hitsPerPage: 8 },
      });
      return (response.hits as unknown as SearchResultItem[]) || [];
    } catch (err) {
      console.warn('Algolia search fallback to local index:', err);
    }
  }

  return [];
}
