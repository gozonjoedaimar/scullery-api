export default function app_config(name: string) {
    const config: Record<string, string> = {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || '8000',
        url: process.env.URL || 'http://localhost:8000',
    };

    try {
        return config[name];
    }
    catch(error) {
        console.log(error);
        return null;
    }
}