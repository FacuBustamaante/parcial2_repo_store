interface LogoutModalProps {
   onConfirm: () => void;
   onCancel: () => void;
}

const LogoutModal = ({ onConfirm, onCancel }: LogoutModalProps) => {
   return (
      <div
         onClick={onCancel}
         style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
         }}
      >
         <div
            onClick={(e) => e.stopPropagation()}
            className="sans"
            style={{
               background: "var(--surface)",
               border: "1px solid var(--line-strong)",
               borderRadius: "var(--r-lg)",
               padding: "2rem",
               width: "min(90vw, 380px)",
               display: "flex",
               flexDirection: "column",
               gap: "1.25rem",
            }}
         >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
               <h2
                  className="serif"
                  style={{ color: "var(--text)", fontSize: "1.25rem", fontWeight: 600 }}
               >
                  ¿Cerrar sesión?
               </h2>
               <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                  Tu carrito y preferencias se mantendrán guardados.
               </p>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
               <button
                  onClick={onCancel}
                  style={{
                     padding: "0.5rem 1.1rem",
                     borderRadius: "var(--r-md)",
                     border: "1px solid var(--line-strong)",
                     background: "transparent",
                     color: "var(--text-muted)",
                     fontSize: "0.875rem",
                     cursor: "pointer",
                     transition: "border-color 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                     e.currentTarget.style.borderColor = "var(--text-faint)";
                     e.currentTarget.style.color = "var(--text)";
                  }}
                  onMouseLeave={(e) => {
                     e.currentTarget.style.borderColor = "var(--line-strong)";
                     e.currentTarget.style.color = "var(--text-muted)";
                  }}
               >
                  Cancelar
               </button>
               <button
                  onClick={onConfirm}
                  style={{
                     padding: "0.5rem 1.1rem",
                     borderRadius: "var(--r-md)",
                     border: "1px solid var(--gold)",
                     background: "var(--gold)",
                     color: "var(--gold-contrast)",
                     fontSize: "0.875rem",
                     fontWeight: 600,
                     cursor: "pointer",
                     transition: "background 0.15s, border-color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                     e.currentTarget.style.background = "var(--gold-deep)";
                     e.currentTarget.style.borderColor = "var(--gold-deep)";
                  }}
                  onMouseLeave={(e) => {
                     e.currentTarget.style.background = "var(--gold)";
                     e.currentTarget.style.borderColor = "var(--gold)";
                  }}
               >
                  Cerrar sesión
               </button>
            </div>
         </div>
      </div>
   );
};

export default LogoutModal;
