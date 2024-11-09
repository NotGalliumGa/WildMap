/**
 * pin.java
 * WildMap
 * 
 * Created by Diego by 11/8/24
 * 
 * Class for the location pins
 */
package BackEnd.data;

public class pin {
    private String name;
    private String desc;
    private String link;
    private String photo;

    public pin(String n, String d, String l, String p) {
        this.name = n;
        this.desc = d;
        this.link = l;
        this.photo = p;
    }


    @Override
    public String toString() {
        return "Pin{" +
                "name = " + name + '\'' +
                ", desc = " + desc + '\'' +
                ", link = " + link + '\'' +
                ", photo = " + photo + '\'' +
                '}';               
    }
}