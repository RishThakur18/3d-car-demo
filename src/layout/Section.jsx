export default function Section({children, className}) {

    return (
        <div className={ className ? `section ${className}` : "section" }>
            {children}
        </div>
    );
}