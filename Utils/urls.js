export const DEV = true;

export const urls = DEV ? "http://192.168.0.153:8085" : "https://www.mnfansubs.net";

export const STATUS = {
    PENDING: {
        label: "Хүлээгдэж байгаа",
        color: "#20A8D8",
    },
    CONFIRMED: {
        label: "Баталгаажсан",
        color: "#4DBD74",
    },
    CANCELLED: {
        label: "Цуцлагдсан",
        color: "#F86C6B",
    },
}
