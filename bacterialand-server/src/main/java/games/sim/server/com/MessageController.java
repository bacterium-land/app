package games.sim.server.com;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Slf4j
@Controller
public class MessageController {


    @MessageMapping("/move")
    @SendTo("/ack/validate")
    public MessageValidator read(@NonNull UserMessage message) {
        log.info("Message received from : "+ message.getUserName() + " to target : " + message.getCords());
        return new MessageValidator("Hello, " + HtmlUtils.htmlEscape(message.getUserName() + "!"));
    }
}
