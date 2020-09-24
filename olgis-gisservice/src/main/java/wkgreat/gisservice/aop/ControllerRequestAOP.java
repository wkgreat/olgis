package wkgreat.gisservice.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

/**
 * @author wkgreat
 */
@Aspect
@Component
public class ControllerRequestAOP {

    private final static Logger log = LoggerFactory.getLogger(ControllerRequestAOP.class);

    @Pointcut("execution(public * wkgreat.gisservice.*..controller.*.*(..))")
    public void requestLog(){}

    @Before("requestLog()")
    public void beforeRequestLog(JoinPoint joinPoint) {
        ServletRequestAttributes attributes =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String url = request.getRequestURL().toString();
        String ip = request.getRemoteAddr();
        log.info("Controller Request URL=[{}], from=[{}]", url, ip);
    }

    @AfterReturning(returning = "ret", pointcut = "requestLog()")
    public void afterRequest(Object ret) {
        log.info("Controller Response=[{}]", ret);
    }

}
