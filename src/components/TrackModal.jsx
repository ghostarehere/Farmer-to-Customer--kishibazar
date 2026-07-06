import { C } from "../styles/theme";
import { gs } from "../styles/sharedStyles";
import { COURIERS, DELIVERY_STAGES } from "../data/couriers";

// ══════════════════════════════════════════════════════════════
// TrackModal — Live delivery-stage tracker shown as an overlay.
// Used by Customer, Admin, and Courier portals.
// ══════════════════════════════════════════════════════════════
export default function TrackModal({ order, onClose, dark }) {
  const s = gs(dark);
  const stageIdx = DELIVERY_STAGES.findIndex((st) => st.key === order.stage);
  const courier = COURIERS.find((c) => c.id === order.courierId);
  const progress = Math.round((stageIdx / (DELIVERY_STAGES.length - 1)) * 100);

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 500, padding: 16 }}
      onClick={onClose}
    >
      <div style={{ ...s.card, maxWidth: 460, width: "100%", maxHeight: "90vh", overflowY: "auto", margin: 0, padding: 24 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: C.muted }}>ট্র্যাকিং</div>
            <div style={{ fontSize: 20, fontWeight: 900 }}>#{order.id}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: C.muted }}>×</button>
        </div>

        <div style={{ background: dark ? "#160F2E" : "#EDEBFA", borderRadius: 6, padding: 20, marginBottom: 16, position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.05,
              backgroundImage:
                "repeating-linear-gradient(0deg,#2D6A4F 0,#2D6A4F 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,#2D6A4F 0,#2D6A4F 1px,transparent 1px,transparent 32px)",
            }}
          />
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>🌾</div>
              <div style={{ fontSize: 10, color: C.leaf, fontWeight: 700 }}>কৃষক</div>
            </div>
            <div style={{ flex: 1, margin: "0 10px" }}>
              <div style={{ height: 5, background: dark ? "#3D3470" : "#D6D2F0", borderRadius: 5 }}>
                <div
                  style={{
                    height: "100%",
                    background: `linear-gradient(90deg,${C.leaf},${C.orange})`,
                    borderRadius: 5,
                    width: `${progress}%`,
                    transition: "width 1s",
                  }}
                />
              </div>
              <div style={{ textAlign: "center", marginTop: 14, fontSize: 22 }}>🚚</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>🏠</div>
              <div style={{ fontSize: 10, color: C.blue, fontWeight: 700 }}>গ্রাহক</div>
            </div>
          </div>
        </div>

        {DELIVERY_STAGES.map((st, i) => {
          const done = i <= stageIdx;
          const active = i === stageIdx;
          return (
            <div key={st.key} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: done ? st.color : dark ? "#3D3470" : "#eee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    boxShadow: active ? `0 0 0 4px ${st.color}33` : "none",
                    transition: "all .4s",
                    flexShrink: 0,
                  }}
                >
                  {done ? st.icon : "·"}
                </div>
                {i < DELIVERY_STAGES.length - 1 && (
                  <div style={{ width: 2, height: 24, background: i < stageIdx ? st.color : dark ? "#3D3470" : "#eee", transition: "background .4s" }} />
                )}
              </div>
              <div style={{ paddingTop: 7 }}>
                <div style={{ fontWeight: active ? 800 : done ? 600 : 400, color: done ? st.color : dark ? "#555" : C.muted, fontSize: 13 }}>{st.label}</div>
                {active && <div style={{ fontSize: 11, color: C.muted }}>● এই মুহূর্তে</div>}
              </div>
            </div>
          );
        })}

        {courier && (
          <div style={{ marginTop: 16, background: dark ? "#160F2E" : C.offwhite, borderRadius: 5, padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 36 }}>{courier.avatar}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{courier.name}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{courier.vehicle} · ⭐{courier.rating}</div>
            </div>
            <a href={`tel:${courier.phone}`} style={{ ...s.btn(C.leaf), textDecoration: "none", padding: "7px 14px" }}>📞</a>
          </div>
        )}
      </div>
    </div>
  );
}
