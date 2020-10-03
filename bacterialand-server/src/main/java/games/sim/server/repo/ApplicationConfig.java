package games.sim.server.repo;

import com.mongodb.MongoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.convert.CustomConversions;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.List;


/**
 * Spring JavaConfig configuration class to setup a Spring container and infrastructure components like a
 * {@link DataSource}, a {@link EntityManagerFactory} and a {@link PlatformTransactionManager}.
 *
 * @author Oliver Gierke
 */

@PropertySource("classpath:application.properties")
@Configuration
@ComponentScan
@EnableMongoRepositories
public class ApplicationConfig extends AbstractMongoConfiguration {

    @Value("mongodb.user")
    private String user;

    @Value("mongodb.pass")
    private String pass;

    @Value("mongodb.connection.string")
    private String connection;

    private MongoClient mongoClient;

    @Autowired
    private List<Converter<?, ?>> converters;

    /*
     * (non-Javadoc)
     * @see org.springframework.data.mongodb.config.AbstractMongoConfiguration#getDatabaseName()
     */
    @Override
    protected String getDatabaseName() {
        return "e-store";
    }


    /*
     * (non-Javadoc)
     * @see org.springframework.data.mongodb.config.AbstractMongoConfiguration#customConversions()
     */
    @Override
    public CustomConversions customConversions() {
                return new CustomConversions(converters);
            }

    @Override
    public MongoClient mongoClient() {
        if (mongoClient == null)
        {
            mongoClient = new MongoClient(this.connection);
        }
        return  mongoClient;
    }
}

