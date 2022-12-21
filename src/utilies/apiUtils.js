import axios from "axios";
import { getAllRequiredHeaders } from "./utilies";

const apiEndpoint = process.env.REACT_APP_API_BASEURL;

const client = axios.create({
    baseURL: apiEndpoint,
    headers: {
        'content-type': 'application/json',
        accept: 'application/json',
    }
})

export const getRequest = async (url) => {
    try {
        const res = await client.get(url, {
            headers: { ...getAllRequiredHeaders() }
        })
        const { data, status } = res;
        if (status === 200) {
            return { result: data, error: false }
        }
        return { result: [], error: true }
    } catch (error) {
        return { result: [], error: true }
    }
}

export const postRequest = async (url, payload = {}) => {
    try {
        const res = await client.post(url, payload, {
            headers: { ...getAllRequiredHeaders() }
        })
        const { data, status } = res;
        if (status === 200) {
            return { result: data, error: false }
        }
        return { result: [], error: true }
    } catch (error) {
        return { result: [], error: true }
    }
}

export const putRequest = async (url, payload) => {
    try {
        const res = await client.put(url, payload, {
            headers: { ...getAllRequiredHeaders() }
        })
        const { data, status } = res;
        if (status === 200) {
            return { result: data, error: false}
        }
        return { result: [], error: true}
    } catch (error) {
        return { result: [], error: true}
    }
}

export const patchRequest = async (url, payload) => {
    try {
        const res = await client.patch(url, payload, {
            headers: { ...getAllRequiredHeaders() }
        })
        const { data, status } = res;
        if (status === 200) {
            return { result: data, error: false }
        }
        return { result: [], error: true }
    } catch (error) {
        return { result: [], error: true }
    }
}

export const deleteRequest = async (url, payload) => {
    try {
        const res = await client.delete(url, {
            headers: { ...getAllRequiredHeaders() }
        })
        const { data, status } = res;
        if (status === 200) {
            return { result: data, error: false }
        }
        return { result: [], error: true }
    } catch (error) {
        return { result: [], error: true }
    }
}