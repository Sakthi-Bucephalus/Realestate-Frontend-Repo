import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Utility component to dynamically set the document title and meta description
 * based on the active public route for SEO and Meta App Review compliance.
 */
export const DocumentTitle = ({ title, description }) => {
  const location = useLocation();

  useEffect(() => {
    // Set Document Title
    const baseTitle = 'RSVLeadSync — Meta Ads Lead Integration & CRM Platform';
    document.title = title ? `${title} | RSVLeadSync` : baseTitle;

    // Set or Update Meta Description
    if (description) {
      let metaTag = document.querySelector('meta[name="description"]');
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = 'description';
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', description);
    }
  }, [title, description, location.pathname]);

  return null;
};
