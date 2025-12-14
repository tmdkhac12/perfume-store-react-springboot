package com.example.perfume_store.common.exceptions;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.List;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionsHandler {

    private ResponseEntity<?> getErrorRespond(HttpStatus status, String message, HttpServletRequest request) {
        return ApiResponseFactory.error(status, message, request);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleNotFound(NotFoundException ex, HttpServletRequest request) {
        return getErrorRespond(HttpStatus.NOT_FOUND, ex.getMessage(), request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fieldError -> fieldError.getDefaultMessage())
                .toList();

        return getErrorRespond(HttpStatus.BAD_REQUEST, errors.getFirst(), request);
    }

    @ExceptionHandler({
            MethodArgumentTypeMismatchException.class,
            HttpMessageNotReadableException.class
    })
    public ResponseEntity<?> handleBadRequest(Exception ex, HttpServletRequest request) {
        return getErrorRespond(HttpStatus.BAD_REQUEST, "Invalid Request", request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleUnknown(Exception ex, HttpServletRequest request) {
        log.error(ex.getMessage());
        return getErrorRespond(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong, please try again later!", request);
    }
}
