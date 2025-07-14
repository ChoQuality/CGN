package com.gsbizple.wiz.common.service;

public interface WebClientService {
    <Response> Response get(String endPoint, Class<Response> responseType, String token);

    <Request, Response> Response post(String endPoint, Request request, Class<Response> responseType, String token);

    <Request, Response> Response put(String endPoint, Request request, Class<Response> responseType, String token);

}
