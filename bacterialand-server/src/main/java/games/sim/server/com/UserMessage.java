package games.sim.server.com;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
public class UserMessage {
    // User name sent
    private String userName;
    //The coordinates of its movement
    private Cords cords;
}
