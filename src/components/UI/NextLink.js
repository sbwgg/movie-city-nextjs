import Link from 'next/link';
import {useRouter} from 'next/router';

const NextLink = props => {
    const {
        href,
        children
    } = props;

    const router = useRouter();

    return (
        <Link href={href} {...props} locale={router.locale}>
            {children}
        </Link>
    )
}

export default NextLink;
