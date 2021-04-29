declare const _default: {
    host: {
        url: string;
        port: string;
    };
    jwt: {
        secretOrKey: string;
        expiresIn: number;
    };
    mail: {
        host: string;
        port: string;
        secure: boolean;
        user: string;
        pass: string;
    };
    templateDir: string;
};
export default _default;
