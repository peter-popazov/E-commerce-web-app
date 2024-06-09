package com.ecommerce.app.logging;

import com.ecommerce.app.auth.AuthController;
import com.ecommerce.app.auth.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Around("@within(com.ecommerce.app.logging.LoggingController) || @annotation(com.ecommerce.app.logging.LoggingController)")
    public Object logController(ProceedingJoinPoint joinPoint) throws Throwable {
        return appLogger(joinPoint, "Controller");
    }

    @Around("@within(com.ecommerce.app.logging.LoggingService) || @annotation(com.ecommerce.app.logging.LoggingService)")
    public Object logService(ProceedingJoinPoint joinPoint) throws Throwable {
        return appLogger(joinPoint, "Service");
    }

    public Object appLogger(ProceedingJoinPoint pjp, String layer) throws Throwable {
        ObjectMapper mapper = new ObjectMapper();
        String className = pjp.getTarget().getClass().getName();
        String methodName = pjp.getSignature().getName();
        Object[] args = pjp.getArgs();

        if (className.equals(AuthController.class.getName()) || className.equals(AuthService.class.getName())
                || methodName.equals("registerStaff")) {
            logger.info("[{}]: method invoked: {}.{}", layer, className, methodName);
            Object result = pjp.proceed(args);
            logger.info("[{}]: method finished successfully: {}.{}", layer, className, methodName);
            return result;
        }

        logger.info("[{}]: method invoked: {}.{}({})", layer, className, methodName, mapper.writeValueAsString(args));
        Object result = pjp.proceed(args);
        logger.info("[{}]: method result: {}.{} = {}", layer, className, methodName, mapper.writeValueAsString(result));
        return result;
    }

}