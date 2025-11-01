import 'next-auth'

declare module 'next-auth' {
    interface User {
        _id?: string;
        isverified?: boolean;
        username?: string;
        isAcceptingMessages?: boolean;
    }

    interface Session {
        user: {
            _id?: string;
            isverified?: boolean;
            username?: string;
            isAcceptingMessages?: boolean;
        } & DefaultSession['user']
    }

}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        isverified?: boolean;
        username?: string;
        isAcceptingMessages?: boolean;
    }
}