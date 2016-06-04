/**
 Burner assignment
 * Created by Michael on 2/8/2016.
 */
import java.util.*;
public class Stove {
    private static ArrayList<Burner> burners = new ArrayList<Burner>();
    public static void main(String[] args) {
        // Initialize each burner
        for(int i=0; i<4; i++)
            burners.add((new Burner()));

        // Show first test.
        System.out.println("\nAll burners off");
        displayStove();

        // Set each burner to each setting.
        System.out.println("\nEach setting.");
        for(int i=0; i<4; i++)
            for(int j=0; j<i; j++)
                burners.get(j).increaseSetting();
        completeTick(); displayStove();

        // Increase some burners up, and some down.
        System.out.println("\nSome up, some down.");
        for(int i=0; i<4; i++)
            if(Math.random() > .5)
                burners.get(i).increaseSetting();
            else
                burners.get(i).decreaseSetting();
        completeTick(); displayStove();

        // Increase some burners down.
        System.out.println("\nSome down.");
        for(int i=0; i<4; i++)
            if(Math.random() > .5)
                burners.get(i).decreaseSetting();
        completeTick(); displayStove();
    }
    public static void completeTick() {
        for(int i=0; i<6; i++)
            tick();
    }
    public static void displayStove() {
        System.out.println("Stove:");
        for(Burner b : burners)
            b.display();
    }
    public static void tick() {
        for(Burner b : burners)
            b.updateTemperature();
    }
}
class Burner {
    private static final int TIME_DURATION = 2;
    private static enum Temperature {
        COLD ("Safe to touch"), WARM ("Be careful"), HOT ("Dangerous!");
        private String warning;
        Temperature(String warning) { this.warning = warning; }
        public String toString() { return warning; }
    }
    private Temperature temperature = Temperature.COLD;
    private Setting setting = Setting.OFF;
    private int timer = 0;
    public void increaseSetting() {
        timer += (timer >= TIME_DURATION*3)?TIME_DURATION*3:TIME_DURATION;
        switch(setting) {
            case OFF:
                setting = Setting.LOW;
                break;
            case LOW:
                setting = Setting.MEDIUM;
                break;
            default:
                setting = Setting.HIGH;
        }
    }
    public void decreaseSetting() {
        timer += (timer >= TIME_DURATION*3)?TIME_DURATION*3:TIME_DURATION;
        setting = (setting == Setting.HIGH)?    Setting.MEDIUM:(setting == Setting.MEDIUM)? Setting.LOW:Setting.OFF;
    }
    public void updateTemperature() {
        if(--timer == 0) {
            switch(setting) {
                case HIGH:
                    temperature = Temperature.HOT;
                    break;
                case MEDIUM:
                case LOW:
                    // Both MEDIUM and LOW give us WARM.
                    temperature = Temperature.WARM;
                    break;
                default:
                    temperature = Temperature.COLD;
            }
        }
    }
    // Display the burner in a fancy string format.
    public void display() { System.out.println("["+setting+"] "+temperature); }
}
enum Setting {
    OFF ("---"), LOW ("--+"), MEDIUM ("-++"), HIGH ("+++");
    private String level;
    Setting(String level) { this.level = level; }
    public String toString() { return level; }
}
