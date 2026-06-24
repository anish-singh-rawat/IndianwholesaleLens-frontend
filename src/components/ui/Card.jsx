const Card = ({ children, className = '' }) => {
  return (
    <div
      className={`rounded-2xl p-6 transition-shadow ${className}`}
      style={{
        background: 'color-mix(in oklab, var(--card) 75%, transparent)',
        backdropFilter: 'blur(20px) saturate(160%)',
        border: '1px solid color-mix(in oklab, var(--foreground) 10%, transparent)',
      }}
    >
      {children}
    </div>
  );
};

export default Card;
