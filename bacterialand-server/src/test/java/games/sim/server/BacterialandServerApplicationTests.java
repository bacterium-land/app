package games.sim.server;

import com.mongodb.MongoClient;
import games.sim.server.repo.ApplicationConfig;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Collections;
import java.util.List;

@ExtendWith(SpringExtension.class)
//@ContextConfiguration(classes = {SpringTestConfiguration.class})
@SpringBootTest
class BacteriumlandServerApplicationTests {

    private ApplicationConfig repo = new ApplicationConfig();

    @Test
    void contextLoads() {
    }

    @Test
    void testMongoConnect() {
        MongoClient test = repo.mongoClient();
        List<Object> names = Collections.singletonList(test.listDatabaseNames());
        Assert.assertTrue(names != null && !names.isEmpty());
    }

}
