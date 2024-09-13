export enum logType {
    none = 0x00,
    drawing = 0x01,
    hittest = 0x02,
    game = 0x4,
}
export function log(type: logType, text: string): void {
    // override this setting to enable logging or retrieve a value from localstorage 
    let logger: logType = logType.none;

    let value: string | null = localStorage.getItem("logType");

    if (value != null) {
//        logger = value as unknown as logType;
        logger = logType[value as keyof typeof logType];
    }
        
    if (logger & type) {
        console.log(text);
    }
}