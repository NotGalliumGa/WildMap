/**
 * location.java
 * WildMap
 * 
 * Created by Diego by 11/8/24
 * 
 * Array of locations
 */
package BackEnd.data;

import java.util.Arrays;
import java.util.List;


public class location {
    public static final List<pin> LOCATIONs = Arrays.asList(
        new pin( "Memorial Union Building",
        "The Memorial Union Building is home to a variety of facilities and services to help students make the most out of their time here at UNH. Some of the most popular features are the UNH Bookstore, Campus Services, Games Room, Granite Square Station Mailroom, Union Court, and Holloway Commons.",
        "https://www.unh.edu/mub/",
        "a"),
        new pin("Dimond Library", 
        "The Diamond Library is the main library on campus and houses collections supporting the humanities, social sciences, business, health sciences, human services, education, and earth sciences. It is also home to the federal and state depository piblication collections, multimedia, Special Collections, University Archives, and the University Museum. Students enjoy using the library's quiet rooms and comfortable seating to study.",
        "https://library.unh.edu/locations/dimond-library", 
        "a"),
        new pin("Holloway Commons (HoCo)",
        "Holloway Commons is centrally located and the largest dining hall on campus. It features many individual food stations where fresh items are prepared right on the spot. Favorites include stir-fry and brick-oven specialties.",
        "https://www.unh.edu/dining/facility/holloway-commons-hoco", 
         "a")
    );
}
