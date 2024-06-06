import { navigateTo } from "../../utils/router";

export function notFound() {
    const originalTitle = document.title;

    const pageContent = `
        <h2 id="not-found-title">404 - Not Found</h2>
        <p>The page you are looking for does not exist.</p>
    `;

    document.title = "404 - Not Found";

    setTimeout(() => {
        navigateTo('/login');
    }, 5000);

    const onDestroy = () => {
        document.title = originalTitle;
    };

    return { pageContent, onDestroy };
}
