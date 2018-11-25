import React from 'react';
import {
  Component,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Button,
  Picker,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector'
import UIStepper from 'react-native-ui-stepper';


export default class RiderScreen extends React.Component {
  OffCampusList = ['Castilian', 'Skyloft', 'Dobie'];

  constructor(props, ctx) {
    super(props, ctx);
    var user = this.retrieveItem('@User');
    console.log(user);
    this.state = {
      request: {
        User: user,
        timestamp: Math.floor(Date.now() / 1000),
        pickup: '',
        dropoff: '',
        notes: '',
        numRiders: '',
        driverID: 0,
        onCampus: this.onCampus(),
        status: 1,
      },
    };
  }

  clickme = () => {
    var pickup = this.state.PickerValue;
    if (pickup == '') {
      alert('Please select an option');
    } else {
      alert(pickup);
    }
  };

  clicker = () => {
    var dropoff = this.state.Picker2Value;
    if (dropoff == '') {
      alert('Please select an option');
    } else {
      alert(dropoff);
    }
  };

  onCampus() {
    if (this.OffCampusList.indexOf(this.pickup) >= 0) this.onCampus = false;
    else this.onCampus = true;
  }

  async storeItem(key, item) {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }
  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return;
  }

  render() {
    let index = 0;
    const data = [
      { key: index++, label: "ADH ( Almetris Duren Residence Hall )" },
      { key: index++, label: "AF1 ( Athletic Fields Pavilion (Rehab) )" },
      { key: index++, label: "AF2 ( Athletic Fields Pavilion (Eastside) )" },
      { key: index++, label: "AFP ( Athletic Fields Pavilion )" },
      { key: index++, label: "AHG ( Anna Hiss Gymnasium )" },
      { key: index++, label: "ANB ( Arno Nowotny Building )" },
      { key: index++, label: "AND ( Andrews Dormitory )" },
      { key: index++, label: "ARC ( Animal Resources Center )" },
      { key: index++, label: "ART ( Art Building and Museum )" },
      { key: index++, label: "ATT ( AT&T Executive Educ & Conf Center )" },
      { key: index++, label: "BAT ( Batts Hall )" },
      { key: index++, label: "BEL ( L. Theo Bellmont Hall )" },
      { key: index++, label: "BEN ( Benedict Hall )" },
      { key: index++, label: "BGH ( Biological Sciences Greenhouses )" },
      { key: index++, label: "BHD ( Brackenridge Hall Dorm )" },
      { key: index++, label: "BIO ( Biological Laboratories )" },
      { key: index++, label: "BLD ( Blanton Dormitory )" },
      { key: index++, label: "BMA ( Jack S. Blanton Museum of Art )" },
      { key: index++, label: "BMC ( Belo Center for New Media )" },
      { key: index++, label: "BME ( Biomedical Engineering Building )" },
      { key: index++, label: "BMK ( Blanton Museum Ellsworth Kelly )" },
      { key: index++, label: "BMS ( Blanton Museum Smith Building )" },
      { key: index++, label: "BOT ( Biological Greenhouse )" },
      { key: index++, label: "BRB ( Bernard and Audre Rapoport Center )" },
      { key: index++, label: "BRG ( Brazos Garage )" },
      { key: index++, label: "BSB ( Basketball Support Bldg (RecSport) )" },
      { key: index++, label: "BTL ( Battle Hall )" },
      { key: index++, label: "BUR ( Burdine Hall )" },
      { key: index++, label: "BWY ( 2616 Wichita (Bridgeway) )" },
      { key: index++, label: "CAL ( Calhoun Hall )" },
      { key: index++, label: "CBA ( College of Business Administration )" },
      { key: index++, label: "CCG ( Conference Center Garage )" },
      { key: index++, label: "CCJ ( John B. Connally Center for Justice )" },
      { key: index++, label: "CDA ( Comal Child Development Ctr Annex )" },
      { key: index++, label: "CDL ( Collections Deposit Library )" },
      { key: index++, label: "CEE ( Continuing Engineering Education )" },
      { key: index++, label: "CLK ( Caven Clark Field Support Building )" },
      { key: index++, label: "CMA ( Jesse H. Jones Comm. Ctr. (Bldg. A) )" },
      { key: index++, label: "CMB ( Jesse H. Jones Comm. Ctr. (Bldg. B) )" },
      { key: index++, label: "CML ( Comal St. Child Development Center )" },
      { key: index++, label: "COM ( Computation Center )" },
      { key: index++, label: "CPB ( Compactor Building )" },
      { key: index++, label: "CPC ( Cpc Field Staff Office )" },
      { key: index++, label: "CPE ( Chemical and Petroleum Engineering )" },
      { key: index++, label: "CRB ( Computational Resource Building )" },
      { key: index++, label: "CRD ( Carothers Dormitory )" },
      { key: index++, label: "CRH ( Creekside Residence Hall )" },
      { key: index++, label: "CS3 ( Central Chilling Station No. 3 )" },
      { key: index++, label: "CS4 ( Central Chilling Station No. 4 )" },
      { key: index++, label: "CS5 ( Central Chilling Station No. 5 )" },
      { key: index++, label: "CS6 ( Central Chilling Station No. 6 )" },
      { key: index++, label: "CS7 ( Central Chilling Station No. 7 )" },
      { key: index++, label: "CSS ( Carothers Dorm Substation )" },
      { key: index++, label: "CT1 ( Cooling Tower 1 )" },
      { key: index++, label: "DCP ( Denton A. Cooley Pavilion )" },
      { key: index++, label: "DEV ( Development Office Building )" },
      { key: index++, label: "DFA ( E. William Doty Fine Arts Building )" },
      { key: index++, label: "DFF ( UFCU Disch-Falk Field )" },
      { key: index++, label: "DPI ( Dell Pediatric Research Institute )" },
      { key: index++, label: "DTB ( Dinosaur Trackway Bldg. )" },
      { key: index++, label: "E10 ( Equipment Storehouse # 10 )" },
      { key: index++, label: "E11 ( Equipment Storehouse # 11 )" },
      { key: index++, label: "E12 ( Equipment Storehouse # 12 )" },
      { key: index++, label: "E13 ( Equipment Storehouse # 13 )" },
      { key: index++, label: "E15 ( Equipment Storehouse # 15 )" },
      { key: index++, label: "E23 ( Equipment Storehouse # 23 )" },
      { key: index++, label: "E24 ( Equipment Storehouse # 24 )" },
      { key: index++, label: "E25 ( Equipment Storehouse # 25 )" },
      { key: index++, label: "E26 ( Equipment Storehouse #26 )" },
      { key: index++, label: "ECG ( East Campus Garage )" },
      { key: index++, label: "ECJ ( Ernest Cockrell Jr. Hall )" },
      { key: index++, label: "EER ( Engr Education and Research Center )" },
      { key: index++, label: "EHZ ( ETC Hazmat Storage Building )" },
      { key: index++, label: "EPS ( E.P. Schoch Building )" },
      { key: index++, label: "ERC ( Frank C Erwin Special Events Center )" },
      { key: index++, label: "ETC ( Engineering Teaching Center II )" },
      { key: index++, label: "FAC ( Peter T. Flawn Academic Center )" },
      { key: index++, label: "FC1 ( Facilities Complex Bldg. 1 )" },
      { key: index++, label: "FC2 ( Facilities Complex Bldg. 2 )" },
      { key: index++, label: "FC3 ( Facilities Complex Bldg. 3 )" },
      { key: index++, label: "FC4 ( Facilities Complex Bldg. 4 )" },
      { key: index++, label: "FC5 ( Facilities Complex Bldg. 5 )" },
      { key: index++, label: "FC6 ( Facilities Complex Bldg. 6 )" },
      { key: index++, label: "FC7 ( Facilities Complex Bldg. 7 )" },
      { key: index++, label: "FC8 ( Facilities Complex Bldg. 8 )" },
      { key: index++, label: "FC9 ( Custodial Services Training Fac )" },
      { key: index++, label: "FCS ( Fountain Control Structure )" },
      { key: index++, label: "FDH ( J. Frank Dobie House )" },
      { key: index++, label: "FNT ( Larry R. Faulkner Nanosci. and Tech )" },
      { key: index++, label: "FSB ( Flammable Storage Building )" },
      { key: index++, label: "G01 ( Traffic Kiosk - 2000 San Jacinto )" },
      { key: index++, label: "G02 ( Traffic Kiosk - 2400 San Jacinto )" },
      { key: index++, label: "G05 ( Traffic Kiosk - 100 East 21st )" },
      { key: index++, label: "G06 ( Traffic Kiosk - 400 East 23rd )" },
      { key: index++, label: "G07 ( Traffic Kiosk - 200 West 24th )" },
      { key: index++, label: "G11 ( Parking Kiosk - Lot 40 )" },
      { key: index++, label: "GAR ( Garrison Hall )" },
      { key: index++, label: "GDC ( Gates Dell Complex )" },
      { key: index++, label: "GEA ( Mary E. Gearing Hall )" },
      { key: index++, label: "GEB ( Dorothy L. Gebauer Building )" },
      { key: index++, label: "GOL ( Goldsmith Hall )" },
      { key: index++, label: "GRC ( Gregory Aquatic Pool Control Bldg. )" },
      { key: index++, label: "GRE ( Gregory Gymnasium )" },
      { key: index++, label: "GRF ( Gregory Aquatic Food Service Bldg. )" },
      { key: index++, label: "GRP ( Gregory Aquatic Pool Equip. Bldg. )" },
      { key: index++, label: "GRS ( Gregory Aquatic Pool Storage Bldg. )" },
      { key: index++, label: "GSB ( Graduate School of Business Bldg. )" },
      { key: index++, label: "GUG ( Guadalupe Garage )" },
      { key: index++, label: "GWB ( Gordon-White Building )" },
      { key: index++, label: "HCG ( Health Center Garage )" },
      { key: index++, label: "HDB ( Health Discovery Building )" },
      { key: index++, label: "HLB ( Health Learning Building )" },
      { key: index++, label: "HLP ( Hartland Plaza-School of Social Wrk )" },
      { key: index++, label: "HMA ( Hogg Memorial Auditorium )" },
      { key: index++, label: "HRC ( Harry Ransom Center )" },
      { key: index++, label: "HRH ( Rainey Hall )" },
      { key: index++, label: "HSM ( William Randolph Hearst Bldg )" },
      { key: index++, label: "HTB ( Health Transformation Building )" },
      { key: index++, label: "IC2 ( 2815 San Gabriel (IC2 Institute) )" },
      { key: index++, label: "Abbr. ( Name )" },
      { key: index++, label: "ICB ( Intramural Control Bldg. )" },
      { key: index++, label: "IMA ( Intramural Maint Bldg A )" },
      { key: index++, label: "IMB ( Intramural Maint Bldg B )" },
      { key: index++, label: "IPF ( Indoor Practice Facility )" },
      { key: index++, label: "JCD ( Jester Dormitory )" },
      { key: index++, label: "JES ( Beauford H. Jester Center )" },
      { key: index++, label: "JGB ( Jackson Geological Sciences Bldg. )" },
      { key: index++, label: "JHH ( John W. Hargis Hall )" },
      { key: index++, label: "JON ( Jesse H. Jones Hall )" },
      { key: index++, label: "KIN ( Kinsolving Dormitory )" },
      { key: index++, label: "LAC ( Lake Austin Centre )" },
      { key: index++, label: "LBJ ( Lyndon B Johnson Library )" },
      { key: index++, label: "LCD ( Lavaca St. Child Development Center )" },
      { key: index++, label: "LCH ( Littlefield Carriage House )" },
      { key: index++, label: "LDH ( Longhorn Dining Facility )" },
      { key: index++, label: "LFH ( Littlefield Home )" },
      { key: index++, label: "LLA ( Living Learning Hall A )" },
      { key: index++, label: "LLB ( Living Learning Hall B )" },
      { key: index++, label: "LLC ( Living Learning Hall C )" },
      { key: index++, label: "LLD ( Living Learning Hall D )" },
      { key: index++, label: "LLE ( Living Learning Hall E )" },
      { key: index++, label: "LLF ( Living Learning Hall F )" },
      { key: index++, label: "LS1 ( Landscape Services Storage Bldg. )" },
      { key: index++, label: "LTD ( Littlefield Dormitory )" },
      { key: index++, label: "LTH ( Laboratory Theater Bldg. )" },
      { key: index++, label: "MAG ( Manor Garage )" },
      { key: index++, label: "MAI ( Main Building )" },
      { key: index++, label: "MB1 ( Modular Building #1 )" },
      { key: index++, label: "MBB ( Moffett Molecular Biology Bldg. )" },
      { key: index++, label: "MEZ ( Mezes Hall )" },
      { key: index++, label: "MFH ( Richard Mithoff Trk/Scr Fieldhouse )" },
      { key: index++, label: "MHD ( Moore-Hill Dormitory )" },
      { key: index++, label: "MMS ( Mike A. Myers Track & Soccer Stadium )" },
      { key: index++, label: "MNC ( Moncrief-Neuhaus Athletic Center )" },
      { key: index++, label: "MRH ( Music Building & Recital Hall )" },
      { key: index++, label: "MSB ( 2207 Comal (Mail Service Building) )" },
      { key: index++, label: "MTC ( Material Transfer Center )" },
      { key: index++, label: "NEZ ( North End Zone Building )" },
      { key: index++, label: "NHB ( Norman Hackerman Building )" },
      { key: index++, label: "NMS ( Neural and Molecular Science Bldg. )" },
      { key: index++, label: "NOA ( North Office Building A )" },
      { key: index++, label: "NUR ( Nursing School )" },
      { key: index++, label: "PA1 ( Power Plant Annex Storehouse # 1 )" },
      { key: index++, label: "PA3 ( Power Plant Annex Storehouse #3-Wd )" },
      { key: index++, label: "PA4 ( Power Plant Annex Storehouse #4-Met )" },
      { key: index++, label: "PAC ( Performing Arts Center )" },
      { key: index++, label: "PAI ( T.S. Painter Hall )" },
      { key: index++, label: "PAR ( Parlin Hall )" },
      { key: index++, label: "PAT ( J.T. Patterson Labs Bldg. )" },
      { key: index++, label: "PB2 ( Power Plant Aux. Bldg.# 2 )" },
      { key: index++, label: "PB5 ( Power Plant Aux. Bldg.# 5 )" },
      { key: index++, label: "PB6 ( Power Plant Aux. Bldg.# 6 )" },
      { key: index++, label: "PCL ( Perry-Castaneda Library )" },
      { key: index++, label: "PH1 ( Athletic Fields Pump House (North) )" },
      { key: index++, label: "PH2 ( Athletic Fields Pump House (South) )" },
      { key: index++, label: "PHD ( Prather Hall Dormitory )" },
      { key: index++, label: "PHR ( Pharmacy Building )" },
      { key: index++, label: "POB ( Peter O'Donnell Jr. Building )" },
      { key: index++, label: "PPA ( Hal C. Weaver Power Plant Annex )" },
      { key: index++, label: "PPE ( Hal C Weaver Power Plant Expansion )" },
      { key: index++, label: "PPL ( Hal C. Weaver Power Plant )" },
      { key: index++, label: "PRH ( Dobie Paisano Ranch House )" },
      { key: index++, label: "QTR ( Quarters Building )" },
      { key: index++, label: "RHD ( Roberts Hall Dormitory )" },
      { key: index++, label: "RHG ( Rowling Hall Garage )" },
      { key: index++, label: "RLM ( Robert Lee Moore Hall )" },
      { key: index++, label: "RLP ( Patton Hall )" },
      { key: index++, label: "ROW ( Intercollegiate Rowing Boat House )" },
      { key: index++, label: "RRH ( Robert B. Rowling Hall )" },
      { key: index++, label: "RSC ( Recreational Sports Center )" },
      { key: index++, label: "SAC ( Student Activity Center )" },
      { key: index++, label: "SAG ( San Antonio Garage )" },
      { key: index++, label: "SBS ( Red and Charline McCombs Field )" },
      { key: index++, label: "SEA ( Sarah M. & Charles E. Seay Building )" },
      { key: index++, label: "SER ( Service Building )" },
      { key: index++, label: "SJG ( San Jacinto Garage )" },
      { key: index++, label: "SJH ( San Jacinto Residence Hall )" },
      { key: index++, label: "SOF ( Telecomm.Svc.Satellite Ops Facility )" },
      { key: index++, label: "SRH ( Sid Richardson Hall )" },
      { key: index++, label: "SSB ( Student Services Building )" },
      { key: index++, label: "SSW ( School of Social Work Building )" },
      { key: index++, label: "STD ( Darrell K Royal TX Memorial Stadium )" },
      { key: index++, label: "SUT ( Sutton Hall )" },
      { key: index++, label: "SW7 ( 2617 Speedway (Ofc.Bldg.) )" },
      { key: index++, label: "SWG ( Speedway Garage )" },
      { key: index++, label: "SZB ( George I. Sanchez Building )" },
      { key: index++, label: "TCC ( Joe C Thompson Conference Center )" },
      { key: index++, label: "TCP ( Texas Cowboys Pavilion )" },
      { key: index++, label: "TES ( Thermal Energy Storage )" },
      { key: index++, label: "TMM ( Texas Memorial Museum )" },
      { key: index++, label: "TNH ( Townes Hall )" },
      { key: index++, label: "TRG ( Trinity Garage )" },
      { key: index++, label: "TSB ( Tennis Support Building )" },
      { key: index++, label: "TSC ( Lee & Joe Jamail Texas Swimming Ctr )" },
      { key: index++, label: "TSG ( 27th Street Garage )" },
      { key: index++, label: "TTC ( Texas Tennis Center )" },
      { key: index++, label: "UA9 ( 2609 University Avenue )" },
      { key: index++, label: "UIL ( Univ. Interscholastic League Bldg. )" },
      { key: index++, label: "UNB ( Union Building )" },
      { key: index++, label: "UPB ( University Police Building )" },
      { key: index++, label: "UTA ( UT Administration Building )" },
      { key: index++, label: "UTC ( University Teaching Center )" },
      { key: index++, label: "UTX ( Etter-Harbin Alumni Center )" },
      { key: index++, label: "VRX ( KVRX Transmitter Twr & Cntrl Bldg )" },
      { key: index++, label: "WAG ( Waggener Hall )" },
      { key: index++, label: "WAT ( Arthur P. Watson House )" },
      { key: index++, label: "WCH ( Will C. Hogg Bldg. )" },
      { key: index++, label: "WCS ( Waller Creek Control Station )" },
      { key: index++, label: "WEL ( Robert A. Welch Hall )" },
      { key: index++, label: "WGB ( Whitaker Gateway Building )" },
      { key: index++, label: "WIN ( F.L. Winship Drama Bldg. )" },
      { key: index++, label: "WMB ( West Mall Office Bldg. )" },
      { key: index++, label: "WRW ( W.R. Woolrich Labs. )" },
      { key: index++, label: "WWH ( Walter Webb Hall )" },
      { key: index++, label: "Castilian" },
      { key: index++, label: "Skyloft" },
      { key: index++, label: "Dobie" }
      // etc...
      // Can also add additional custom keys which are passed to the onChange callback
    ];
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Where are you?</Text>
            <ModalSelector
              data={data}
              initValue="Source"
              selectStyle={{ borderColor: 'grey', padding: 15 }}
              selectTextStyle={{ fontSize: 20 }}
              optionStyle={{ padding: 10, }}
              optionTextStyle={{ fontSize: 15, color: '#E87636' }}
              onChange={(option) => { alert(`${option.label}`); this.state.request.pickup = option.label; console.log(this.state.user); }} />

            <Text style={styles.title}>Where do you want to go?</Text>
            <ModalSelector
              data={data}
              initValue="Destination"
              placeholderTextColor='black'
              selectStyle={{ borderColor: 'grey', padding: 15, marginBottom: 20 }}
              selectTextStyle={{ fontSize: 20 }}
              sectionTextStyle={{ padding: 20 }}
              onChange={(option) => { alert(`${option.label}`); this.state.request.dropoff = option.label; }} />
            <Text style={styles.title}>How many Riders?</Text>

            <View
              style={{ alignItems: 'center' }}>
              <UIStepper
                displayValue={true}
                maximumValue={6}
                textColor='#E87636'
                tintColor='#E87636'
                borderColor='#E87636'
                width={200}
                height={40}
                onValueChange={(value) => { this.state.request.numRiders = value; console.log(this.state.request.numRiders) }}
              />
            </View>

            <TextInput
              style={styles.searchInput}
              placeholderTextColor='black'
              placeholder="Additional Information"
              onChangeText={text => this.state.request.notes = text}
              value={this.state.notes}
            />

            <TouchableOpacity
              onPress={() =>
                fetch('https://react-test-79a3b.firebaseio.com/rides.json', {
                  method: 'POST',
                  body: JSON.stringify(this.state.request),
                })
              }
              style={styles.button}
            >
              <Text style={styles.buttonTxt}>Request a Ride</Text>
            </TouchableOpacity>
          </View>
          <Button title="<- Home" onPress={() => navigate('Main', {})} />
          <Button title="Driver ->" onPress={() => navigate('DriverQueue', {})} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection: 'column',
    marginTop: 30,
    backgroundColor: 'white',
    padding: 20,
  },
  submit: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    left: 0,
  },
  searchInput: {
    height: 40,
    fontSize: 18,
    borderWidth: 1,
    padding: 10,
    marginTop: 30,
    marginBottom: 10,
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    borderColor: 'grey',
    borderRadius: 5,
  },
  title: {
    color: '#E87636',
    padding: 10,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 25
  },
  button: {
    backgroundColor: "#E87636",
    flex: 1,
    margin: 20,
    marginTop: 30,
    padding: 10,
    marginRight: 5,
    borderRadius: 50
  },
  buttonTxt: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 5,
  }
});
