export default function SectionGroup({children, className}) {

    return (
        <div className={ className ? `section-wrapper ${className}` : "section-wrapper" }>
            {children}
        </div>
    );
}