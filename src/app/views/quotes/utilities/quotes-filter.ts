import {Quote} from "../../../models/quote";

export const quotesFilter = (quotes: Quote[], search: string): Quote[] => {
  if (!quotes.length)
    return [];

  if (!search.length)
    return quotes;

  // Split the search into different keywords.
  const keywords = search.split(' ');

  // For each keyword, check the content and the author of every quote.
  return quotes.filter(quote => {
    return keywords.some(keyword => {
      return (
        keyword &&
        (quote.content.toLowerCase().includes(keyword.toLowerCase()) ||
          quote.author.toLowerCase().includes(keyword.toLowerCase()))
      )
    })
  })
}
