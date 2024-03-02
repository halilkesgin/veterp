interface HeadingProps {
    title: string
    description?: string
}

export const Heading = ({
    title,
    description,
}: HeadingProps) => {
    return (
        <div className="flex items-center justify-between">
            <div className="grid">
                <h1 className="font-heading font-semibold text-xl md:text-2xl">
                    {title}
                </h1>
                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}