package com.market.util;

public class JSONResult {

    private String result; // success, fail
    private String message; // if fail, set
    private Object data; // if success, set data

    public static JSONResult success(Object data) {
        return new JSONResult("true", null, data);
    }

    public static JSONResult success(Object data, String value) {
        return new JSONResult("true", value, data);
    }

    public static JSONResult fail(String message) {
        return new JSONResult("false", message, null);
    }

    private JSONResult(String result, String message, Object data) {
        this.result = result;
        this.message = message;
        this.data = data; 
    }

    public JSONResult() {
        super();
        // TODO Auto-generated constructor stub
    }

    public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	@Override
    public String toString() {
        return "JSONResult [result=" + result + ", message=" + message + ", data=" + data + "]";
    }

}