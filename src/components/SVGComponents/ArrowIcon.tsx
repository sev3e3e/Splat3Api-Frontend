type Color = 'white' | 'black' | 'red' | 'blue' | 'green';
export const ArrowIcon = ({ color }: { color: Color }) => (
    <svg viewBox='0 0 31 29.32' style={{ fill: color }}>
        <polygon points='12.65 9.29 30.68 6.35 30.68 24.35 12.65 21.33 12.65 29.32 0.66 15.32 12.68 1.35 12.65 9.29' />
    </svg>
);
