export default function Divide({ direction, colorOne, colorTwo, children }) {
  return (
    <div
      style={{
        height: "100vh",
        background: `linear-gradient(to ${direction}, ${colorOne} 50%, ${colorTwo} 50%)`,
      }}
    >
      {children}
    </div>
  );
}
