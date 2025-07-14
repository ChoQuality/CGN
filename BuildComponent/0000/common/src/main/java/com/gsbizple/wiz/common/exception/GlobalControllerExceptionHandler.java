package com.gsbizple.wiz.common.exception;

import com.gsbizple.wiz.common.constant.view.StatusType;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class GlobalControllerExceptionHandler {

    @ExceptionHandler({NullPointerException.class,SecurityException.class})
    public ModelAndView handleNullPointerException() {
        ModelAndView model = new ModelAndView();
        model.setViewName("error/403");  // 404 에러 페이지
        return model;
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ModelAndView handleNotFoundException() {
        ModelAndView model = new ModelAndView();
        model.setViewName("error/404");  // 404 에러 페이지
        return model;
    }

    // 기타 모든 예외 처리
    @ExceptionHandler(Exception.class)
    public ModelAndView handleAllExceptions(Exception e) {
        ModelAndView model = new ModelAndView();
        model.setViewName("error/500");  // 404 에러 페이지
        return model;
    }


}
