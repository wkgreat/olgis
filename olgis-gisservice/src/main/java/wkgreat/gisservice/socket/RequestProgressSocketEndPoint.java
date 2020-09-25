package wkgreat.gisservice.socket;

import com.alibaba.fastjson.JSON;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import wkgreat.domain.basic.RequestProgress;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author wkgreat
 */
@Slf4j
@Component
@ServerEndpoint("/requestProgress/{requestId}")
public class RequestProgressSocketEndPoint {

    private static ConcurrentHashMap<String, Session> sessionPools = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam(value = "requestId") String requestId) {
        System.out.println("session in open.");
        try {
            sessionPools.put(requestId, session);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RequestProgressSocketEndPoint error, e=[{}]", e.getMessage());
        }
    }

    @OnMessage
    public void onMessage(String message, Session session, @PathParam(value = "requestId") String requestId) {
        log.info("RequestProgressSocketEndPoint onMessage, requestId=[{}], message=[{}]", requestId, message);
    }

    public void sendRunningProgress(String requestId, Double progress) {
        sendProgress(RequestProgress.running(requestId, progress));
    }

    public void sendRunningProgress(String requestId, Double cur, Double total) {
        sendProgress(RequestProgress.running(requestId, cur, total));
    }

    public void sendSuccessProgress(String requestId) {
        sendProgress(RequestProgress.success(requestId));
    }

    public void sendFailedProgress(String requestId, String msg) {
        sendProgress(RequestProgress.failed(requestId, msg));
    }

    public void sendProgress(RequestProgress requestProgress) {
        log.info("RequestProgressSocketEndPoint sendProgress [{}]", requestProgress);
        Session session = sessionPools.get(requestProgress.getRequestId());
        if(session!=null) {
            try {
                session.getBasicRemote().sendText(JSON.toJSONString(requestProgress));
            } catch (Exception e) {
                e.printStackTrace();
                log.error("RequestProgressSocketEndPoint sendProgress error, msg=[{}]", e.getMessage());
            }
        } else {
            log.warn("RequestProgressSocketEndPoint sendProgress session is null! requestId=[{}]",
                    requestProgress.getRequestId());
        }
    }

    public void close(String requestId) throws IOException {
        Session session = sessionPools.get(requestId);
        if(session!=null) {
            session.close();
        }
    }

    @OnError
    public void onError(Session session, Throwable error) {
        log.error("RequestProgressSocketEndPoint error, e=[{}]", error.getMessage());
    }

    @OnClose
    public void onClose(Session session, @PathParam(value = "requestId") String requestId) {
        sessionPools.remove(requestId);
        log.info("RequestProgressSocketEndPoint close [{}]", requestId);
    }

}
