import { Link } from "react-router-dom";

const NotFound = () => {
   return (
      <div
         className="flex flex-col items-center justify-center gap-6 text-center"
         style={{ minHeight: "calc(100vh - var(--header-h))", padding: "2rem" }}
      >
         <p
            className="serif"
            style={{
               fontSize: "clamp(6rem, 20vw, 11rem)",
               fontWeight: 700,
               color: "var(--gold)",
               lineHeight: 1,
               opacity: 0.18,
               userSelect: "none",
            }}
         >
            404
         </p>

         <div style={{ marginTop: "-3rem" }}>
            <h1
               className="serif"
               style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "0.5rem",
               }}
            >
               Página no encontrada
            </h1>
            <p
               className="sans"
               style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}
            >
               La ruta que buscás no existe o fue movida.
            </p>
         </div>

         <Link
            to="/store"
            className="sans"
            style={{
               marginTop: "0.5rem",
               padding: "0.6rem 1.5rem",
               borderRadius: "var(--r-md)",
               border: "1px solid var(--gold)",
               color: "var(--gold)",
               fontSize: "0.875rem",
               fontWeight: 500,
               letterSpacing: "0.04em",
               textDecoration: "none",
               transition: "background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
               (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)";
               (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-contrast)";
            }}
            onMouseLeave={(e) => {
               (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
               (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)";
            }}
         >
            Volver a la tienda
         </Link>
      </div>
   );
};

export default NotFound;
