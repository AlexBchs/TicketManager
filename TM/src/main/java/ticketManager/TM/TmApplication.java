package ticketManager.TM;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication(scanBasePackages = "ticketManager.TM")
public class TmApplication extends SpringBootServletInitializer  {

	public static void main(String[] args) {
		SpringApplication.run(TmApplication.class);
	}

}
