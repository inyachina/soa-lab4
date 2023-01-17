//package com.soa.lab2.contoller.exception_handler;
//
//import com.soa.lab2.exception.BadRequestException;
//import com.soa.lab2.exception.NoEntityException;
//import org.springframework.dao.EmptyResultDataAccessException;
//import org.springframework.data.mapping.PropertyReferenceException;
//import org.springframework.http.converter.HttpMessageNotReadableException;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
//
//@ControllerAdvice
//public class ApiExceptionMapper {
//
//    @ExceptionHandler({
//            MethodArgumentTypeMismatchException.class,
//            IllegalArgumentException.class,
//            PropertyReferenceException.class,
//            HttpMessageNotReadableException.class
//    })
//
//    public void toMapBadRequestException(Exception e) {
//        throw new BadRequestException(e.getMessage());
//    }
//
////    @ExceptionHandler({
////            EmptyResultDataAccessException.class,
////    })
////    public void toMapNoEntityException(Exception e) {
////        System.out.println("23411111111111111111111111");
////        throw new NoEntityException(e.getMessage());
////    }
//}
