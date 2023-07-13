import Link from 'next/link';

const NextLink = props => {
    const {
        href,
        children
    } = props;

    return (
        <Link href={href} {...props}>
            {children}
        </Link>
    )
}

export default NextLink;