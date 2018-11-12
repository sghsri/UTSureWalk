import React from 'react';
import {Component, TouchableOpacity, StyleSheet, View, Text, Button, Picker} from 'react-native';


export default class RiderScreen extends React.Component {
  
OffCampusList = [ "Castilian", "Skyloft", "Dobie"]

  constructor(props, ctx) {
    super(props, ctx);
    this.state = { 
      timestamp: Math.floor(Date.now() / 1000),
      pickup: "",
      dropoff: "",
      notes: "",
      numRiders: "",
      driverID: 0,
      onCampus: this.onCampus(),
      status: 1,
    };
  }

  clickme=()=>{
    var pickup = this.state.PickerValue;
    if (pickup==""){
      alert("Please select an option");
    }
    else{
      alert(pickup);
    }
  }

  clicker=()=>{
      var dropoff = this.state.Picker2Value;
      if (dropoff==""){
        alert("Please select an option");
      }
      else{
        alert(dropoff);
      }
  }

  onCampus()
  {
    if (this.OffCampusList.indexOf(this.state.pickup) >= 0)
      this.onCampus= false;
    else
      this.onCampus = true;

  }
  
  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Button title= "< Home" onPress={() =>
            navigate('Main', {})
            
            } />
        <Text style={styles.welcome}>
        Welcome Surewalk Rider!
        </Text>
        <Picker 
        style={{width: '100%'}}
        selectedValue={this.state.PickerValue}
        onValueChange={(itemValue, itemIndex) => this.setState({PickerValue: itemValue})}
        >
        <Picker.Item label="Select an option" value=""/>
        <Picker.Item label="ADH ( Almetris Duren Residence Hall )" value="ADH ( Almetris Duren Residence Hall )"/>
<Picker.Item label="AF1 ( Athletic Fields Pavilion (Rehab) )" value="AF1 ( Athletic Fields Pavilion (Rehab) )"/>
<Picker.Item label="AF2 ( Athletic Fields Pavilion (Eastside) )" value="AF2 ( Athletic Fields Pavilion (Eastside) )"/>
<Picker.Item label="AFP ( Athletic Fields Pavilion )" value="AFP ( Athletic Fields Pavilion )"/>
<Picker.Item label="AHG ( Anna Hiss Gymnasium )" value="AHG ( Anna Hiss Gymnasium )"/>
<Picker.Item label="ANB ( Arno Nowotny Building )" value="ANB ( Arno Nowotny Building )"/>
<Picker.Item label="AND ( Andrews Dormitory )" value="AND ( Andrews Dormitory )"/>
<Picker.Item label="ARC ( Animal Resources Center )" value="ARC ( Animal Resources Center )"/>
<Picker.Item label="ART ( Art Building and Museum )" value="ART ( Art Building and Museum )"/>
<Picker.Item label="ATT ( AT&T Executive Educ & Conf Center )" value="ATT ( AT&T Executive Educ & Conf Center )"/>
<Picker.Item label="BAT ( Batts Hall )" value="BAT ( Batts Hall )"/>
<Picker.Item label="BEL ( L. Theo Bellmont Hall )" value="BEL ( L. Theo Bellmont Hall )"/>
<Picker.Item label="BEN ( Benedict Hall )" value="BEN ( Benedict Hall )"/>
<Picker.Item label="BGH ( Biological Sciences Greenhouses )" value="BGH ( Biological Sciences Greenhouses )"/>
<Picker.Item label="BHD ( Brackenridge Hall Dorm )" value="BHD ( Brackenridge Hall Dorm )"/>
<Picker.Item label="BIO ( Biological Laboratories )" value="BIO ( Biological Laboratories )"/>
<Picker.Item label="BLD ( Blanton Dormitory )" value="BLD ( Blanton Dormitory )"/>
<Picker.Item label="BMA ( Jack S. Blanton Museum of Art )" value="BMA ( Jack S. Blanton Museum of Art )"/>
<Picker.Item label="BMC ( Belo Center for New Media )" value="BMC ( Belo Center for New Media )"/>
<Picker.Item label="BME ( Biomedical Engineering Building )" value="BME ( Biomedical Engineering Building )"/>
<Picker.Item label="BMK ( Blanton Museum Ellsworth Kelly )" value="BMK ( Blanton Museum Ellsworth Kelly )"/>
<Picker.Item label="BMS ( Blanton Museum Smith Building )" value="BMS ( Blanton Museum Smith Building )"/>
<Picker.Item label="BOT ( Biological Greenhouse )" value="BOT ( Biological Greenhouse )"/>
<Picker.Item label="BRB ( Bernard and Audre Rapoport Center )" value="BRB ( Bernard and Audre Rapoport Center )"/>
<Picker.Item label="BRG ( Brazos Garage )" value="BRG ( Brazos Garage )"/>
<Picker.Item label="BSB ( Basketball Support Bldg (RecSport) )" value="BSB ( Basketball Support Bldg (RecSport) )"/>
<Picker.Item label="BTL ( Battle Hall )" value="BTL ( Battle Hall )"/>
<Picker.Item label="BUR ( Burdine Hall )" value="BUR ( Burdine Hall )"/>
<Picker.Item label="BWY ( 2616 Wichita (Bridgeway) )" value="BWY ( 2616 Wichita (Bridgeway) )"/>
<Picker.Item label="CAL ( Calhoun Hall )" value="CAL ( Calhoun Hall )"/>
<Picker.Item label="CBA ( College of Business Administration )" value="CBA ( College of Business Administration )"/>
<Picker.Item label="CCG ( Conference Center Garage )" value="CCG ( Conference Center Garage )"/>
<Picker.Item label="CCJ ( John B. Connally Center for Justice )" value="CCJ ( John B. Connally Center for Justice )"/>
<Picker.Item label="CDA ( Comal Child Development Ctr Annex )" value="CDA ( Comal Child Development Ctr Annex )"/>
<Picker.Item label="CDL ( Collections Deposit Library )" value="CDL ( Collections Deposit Library )"/>
<Picker.Item label="CEE ( Continuing Engineering Education )" value="CEE ( Continuing Engineering Education )"/>
<Picker.Item label="CLK ( Caven Clark Field Support Building )" value="CLK ( Caven Clark Field Support Building )"/>
<Picker.Item label="CMA ( Jesse H. Jones Comm. Ctr. (Bldg. A) )" value="CMA ( Jesse H. Jones Comm. Ctr. (Bldg. A) )"/>
<Picker.Item label="CMB ( Jesse H. Jones Comm. Ctr. (Bldg. B) )" value="CMB ( Jesse H. Jones Comm. Ctr. (Bldg. B) )"/>
<Picker.Item label="CML ( Comal St. Child Development Center )" value="CML ( Comal St. Child Development Center )"/>
<Picker.Item label="COM ( Computation Center )" value="COM ( Computation Center )"/>
<Picker.Item label="CPB ( Compactor Building )" value="CPB ( Compactor Building )"/>
<Picker.Item label="CPC ( Cpc Field Staff Office )" value="CPC ( Cpc Field Staff Office )"/>
<Picker.Item label="CPE ( Chemical and Petroleum Engineering )" value="CPE ( Chemical and Petroleum Engineering )"/>
<Picker.Item label="CRB ( Computational Resource Building )" value="CRB ( Computational Resource Building )"/>
<Picker.Item label="CRD ( Carothers Dormitory )" value="CRD ( Carothers Dormitory )"/>
<Picker.Item label="CRH ( Creekside Residence Hall )" value="CRH ( Creekside Residence Hall )"/>
<Picker.Item label="CS3 ( Central Chilling Station No. 3 )" value="CS3 ( Central Chilling Station No. 3 )"/>
<Picker.Item label="CS4 ( Central Chilling Station No. 4 )" value="CS4 ( Central Chilling Station No. 4 )"/>
<Picker.Item label="CS5 ( Central Chilling Station No. 5 )" value="CS5 ( Central Chilling Station No. 5 )"/>
<Picker.Item label="CS6 ( Central Chilling Station No. 6 )" value="CS6 ( Central Chilling Station No. 6 )"/>
<Picker.Item label="CS7 ( Central Chilling Station No. 7 )" value="CS7 ( Central Chilling Station No. 7 )"/>
<Picker.Item label="CSS ( Carothers Dorm Substation )" value="CSS ( Carothers Dorm Substation )"/>
<Picker.Item label="CT1 ( Cooling Tower 1 )" value="CT1 ( Cooling Tower 1 )"/>
<Picker.Item label="DCP ( Denton A. Cooley Pavilion )" value="DCP ( Denton A. Cooley Pavilion )"/>
<Picker.Item label="DEV ( Development Office Building )" value="DEV ( Development Office Building )"/>
<Picker.Item label="DFA ( E. William Doty Fine Arts Building )" value="DFA ( E. William Doty Fine Arts Building )"/>
<Picker.Item label="DFF ( UFCU Disch-Falk Field )" value="DFF ( UFCU Disch-Falk Field )"/>
<Picker.Item label="DPI ( Dell Pediatric Research Institute )" value="DPI ( Dell Pediatric Research Institute )"/>
<Picker.Item label="DTB ( Dinosaur Trackway Bldg. )" value="DTB ( Dinosaur Trackway Bldg. )"/>
<Picker.Item label="E10 ( Equipment Storehouse # 10 )" value="E10 ( Equipment Storehouse # 10 )"/>
<Picker.Item label="E11 ( Equipment Storehouse # 11 )" value="E11 ( Equipment Storehouse # 11 )"/>
<Picker.Item label="E12 ( Equipment Storehouse # 12 )" value="E12 ( Equipment Storehouse # 12 )"/>
<Picker.Item label="E13 ( Equipment Storehouse # 13 )" value="E13 ( Equipment Storehouse # 13 )"/>
<Picker.Item label="E15 ( Equipment Storehouse # 15 )" value="E15 ( Equipment Storehouse # 15 )"/>
<Picker.Item label="E23 ( Equipment Storehouse # 23 )" value="E23 ( Equipment Storehouse # 23 )"/>
<Picker.Item label="E24 ( Equipment Storehouse # 24 )" value="E24 ( Equipment Storehouse # 24 )"/>
<Picker.Item label="E25 ( Equipment Storehouse # 25 )" value="E25 ( Equipment Storehouse # 25 )"/>
<Picker.Item label="E26 ( Equipment Storehouse #26 )" value="E26 ( Equipment Storehouse #26 )"/>
<Picker.Item label="ECG ( East Campus Garage )" value="ECG ( East Campus Garage )"/>
<Picker.Item label="ECJ ( Ernest Cockrell Jr. Hall )" value="ECJ ( Ernest Cockrell Jr. Hall )"/>
<Picker.Item label="EER ( Engr Education and Research Center )" value="EER ( Engr Education and Research Center )"/>
<Picker.Item label="EHZ ( ETC Hazmat Storage Building )" value="EHZ ( ETC Hazmat Storage Building )"/>
<Picker.Item label="EPS ( E.P. Schoch Building )" value="EPS ( E.P. Schoch Building )"/>
<Picker.Item label="ERC ( Frank C Erwin Special Events Center )" value="ERC ( Frank C Erwin Special Events Center )"/>
<Picker.Item label="ETC ( Engineering Teaching Center II )" value="ETC ( Engineering Teaching Center II )"/>
<Picker.Item label="FAC ( Peter T. Flawn Academic Center )" value="FAC ( Peter T. Flawn Academic Center )"/>
<Picker.Item label="FC1 ( Facilities Complex Bldg. 1 )" value="FC1 ( Facilities Complex Bldg. 1 )"/>
<Picker.Item label="FC2 ( Facilities Complex Bldg. 2 )" value="FC2 ( Facilities Complex Bldg. 2 )"/>
<Picker.Item label="FC3 ( Facilities Complex Bldg. 3 )" value="FC3 ( Facilities Complex Bldg. 3 )"/>
<Picker.Item label="FC4 ( Facilities Complex Bldg. 4 )" value="FC4 ( Facilities Complex Bldg. 4 )"/>
<Picker.Item label="FC5 ( Facilities Complex Bldg. 5 )" value="FC5 ( Facilities Complex Bldg. 5 )"/>
<Picker.Item label="FC6 ( Facilities Complex Bldg. 6 )" value="FC6 ( Facilities Complex Bldg. 6 )"/>
<Picker.Item label="FC7 ( Facilities Complex Bldg. 7 )" value="FC7 ( Facilities Complex Bldg. 7 )"/>
<Picker.Item label="FC8 ( Facilities Complex Bldg. 8 )" value="FC8 ( Facilities Complex Bldg. 8 )"/>
<Picker.Item label="FC9 ( Custodial Services Training Fac )" value="FC9 ( Custodial Services Training Fac )"/>
<Picker.Item label="FCS ( Fountain Control Structure )" value="FCS ( Fountain Control Structure )"/>
<Picker.Item label="FDH ( J. Frank Dobie House )" value="FDH ( J. Frank Dobie House )"/>
<Picker.Item label="FNT ( Larry R. Faulkner Nanosci. and Tech )" value="FNT ( Larry R. Faulkner Nanosci. and Tech )"/>
<Picker.Item label="FSB ( Flammable Storage Building )" value="FSB ( Flammable Storage Building )"/>
<Picker.Item label="G01 ( Traffic Kiosk - 2000 San Jacinto )" value="G01 ( Traffic Kiosk - 2000 San Jacinto )"/>
<Picker.Item label="G02 ( Traffic Kiosk - 2400 San Jacinto )" value="G02 ( Traffic Kiosk - 2400 San Jacinto )"/>
<Picker.Item label="G05 ( Traffic Kiosk - 100 East 21st )" value="G05 ( Traffic Kiosk - 100 East 21st )"/>
<Picker.Item label="G06 ( Traffic Kiosk - 400 East 23rd )" value="G06 ( Traffic Kiosk - 400 East 23rd )"/>
<Picker.Item label="G07 ( Traffic Kiosk - 200 West 24th )" value="G07 ( Traffic Kiosk - 200 West 24th )"/>
<Picker.Item label="G11 ( Parking Kiosk - Lot 40 )" value="G11 ( Parking Kiosk - Lot 40 )"/>
<Picker.Item label="GAR ( Garrison Hall )" value="GAR ( Garrison Hall )"/>
<Picker.Item label="GDC ( Gates Dell Complex )" value="GDC ( Gates Dell Complex )"/>
<Picker.Item label="GEA ( Mary E. Gearing Hall )" value="GEA ( Mary E. Gearing Hall )"/>
<Picker.Item label="GEB ( Dorothy L. Gebauer Building )" value="GEB ( Dorothy L. Gebauer Building )"/>
<Picker.Item label="GOL ( Goldsmith Hall )" value="GOL ( Goldsmith Hall )"/>
<Picker.Item label="GRC ( Gregory Aquatic Pool Control Bldg. )" value="GRC ( Gregory Aquatic Pool Control Bldg. )"/>
<Picker.Item label="GRE ( Gregory Gymnasium )" value="GRE ( Gregory Gymnasium )"/>
<Picker.Item label="GRF ( Gregory Aquatic Food Service Bldg. )" value="GRF ( Gregory Aquatic Food Service Bldg. )"/>
<Picker.Item label="GRP ( Gregory Aquatic Pool Equip. Bldg. )" value="GRP ( Gregory Aquatic Pool Equip. Bldg. )"/>
<Picker.Item label="GRS ( Gregory Aquatic Pool Storage Bldg. )" value="GRS ( Gregory Aquatic Pool Storage Bldg. )"/>
<Picker.Item label="GSB ( Graduate School of Business Bldg. )" value="GSB ( Graduate School of Business Bldg. )"/>
<Picker.Item label="GUG ( Guadalupe Garage )" value="GUG ( Guadalupe Garage )"/>
<Picker.Item label="GWB ( Gordon-White Building )" value="GWB ( Gordon-White Building )"/>
<Picker.Item label="HCG ( Health Center Garage )" value="HCG ( Health Center Garage )"/>
<Picker.Item label="HDB ( Health Discovery Building )" value="HDB ( Health Discovery Building )"/>
<Picker.Item label="HLB ( Health Learning Building )" value="HLB ( Health Learning Building )"/>
<Picker.Item label="HLP ( Hartland Plaza-School of Social Wrk )" value="HLP ( Hartland Plaza-School of Social Wrk )"/>
<Picker.Item label="HMA ( Hogg Memorial Auditorium )" value="HMA ( Hogg Memorial Auditorium )"/>
<Picker.Item label="HRC ( Harry Ransom Center )" value="HRC ( Harry Ransom Center )"/>
<Picker.Item label="HRH ( Rainey Hall )" value="HRH ( Rainey Hall )"/>
<Picker.Item label="HSM ( William Randolph Hearst Bldg )" value="HSM ( William Randolph Hearst Bldg )"/>
<Picker.Item label="HTB ( Health Transformation Building )" value="HTB ( Health Transformation Building )"/>
<Picker.Item label="IC2 ( 2815 San Gabriel (IC2 Institute) )" value="IC2 ( 2815 San Gabriel (IC2 Institute) )"/>
<Picker.Item label="Abbr. ( Name )" value="Abbr. ( Name )"/>
<Picker.Item label="ICB ( Intramural Control Bldg. )" value="ICB ( Intramural Control Bldg. )"/>
<Picker.Item label="IMA ( Intramural Maint Bldg A )" value="IMA ( Intramural Maint Bldg A )"/>
<Picker.Item label="IMB ( Intramural Maint Bldg B )" value="IMB ( Intramural Maint Bldg B )"/>
<Picker.Item label="IPF ( Indoor Practice Facility )" value="IPF ( Indoor Practice Facility )"/>
<Picker.Item label="JCD ( Jester Dormitory )" value="JCD ( Jester Dormitory )"/>
<Picker.Item label="JES ( Beauford H. Jester Center )" value="JES ( Beauford H. Jester Center )"/>
<Picker.Item label="JGB ( Jackson Geological Sciences Bldg. )" value="JGB ( Jackson Geological Sciences Bldg. )"/>
<Picker.Item label="JHH ( John W. Hargis Hall )" value="JHH ( John W. Hargis Hall )"/>
<Picker.Item label="JON ( Jesse H. Jones Hall )" value="JON ( Jesse H. Jones Hall )"/>
<Picker.Item label="KIN ( Kinsolving Dormitory )" value="KIN ( Kinsolving Dormitory )"/>
<Picker.Item label="LAC ( Lake Austin Centre )" value="LAC ( Lake Austin Centre )"/>
<Picker.Item label="LBJ ( Lyndon B Johnson Library )" value="LBJ ( Lyndon B Johnson Library )"/>
<Picker.Item label="LCD ( Lavaca St. Child Development Center )" value="LCD ( Lavaca St. Child Development Center )"/>
<Picker.Item label="LCH ( Littlefield Carriage House )" value="LCH ( Littlefield Carriage House )"/>
<Picker.Item label="LDH ( Longhorn Dining Facility )" value="LDH ( Longhorn Dining Facility )"/>
<Picker.Item label="LFH ( Littlefield Home )" value="LFH ( Littlefield Home )"/>
<Picker.Item label="LLA ( Living Learning Hall A )" value="LLA ( Living Learning Hall A )"/>
<Picker.Item label="LLB ( Living Learning Hall B )" value="LLB ( Living Learning Hall B )"/>
<Picker.Item label="LLC ( Living Learning Hall C )" value="LLC ( Living Learning Hall C )"/>
<Picker.Item label="LLD ( Living Learning Hall D )" value="LLD ( Living Learning Hall D )"/>
<Picker.Item label="LLE ( Living Learning Hall E )" value="LLE ( Living Learning Hall E )"/>
<Picker.Item label="LLF ( Living Learning Hall F )" value="LLF ( Living Learning Hall F )"/>
<Picker.Item label="LS1 ( Landscape Services Storage Bldg. )" value="LS1 ( Landscape Services Storage Bldg. )"/>
<Picker.Item label="LTD ( Littlefield Dormitory )" value="LTD ( Littlefield Dormitory )"/>
<Picker.Item label="LTH ( Laboratory Theater Bldg. )" value="LTH ( Laboratory Theater Bldg. )"/>
<Picker.Item label="MAG ( Manor Garage )" value="MAG ( Manor Garage )"/>
<Picker.Item label="MAI ( Main Building )" value="MAI ( Main Building )"/>
<Picker.Item label="MB1 ( Modular Building #1 )" value="MB1 ( Modular Building #1 )"/>
<Picker.Item label="MBB ( Moffett Molecular Biology Bldg. )" value="MBB ( Moffett Molecular Biology Bldg. )"/>
<Picker.Item label="MEZ ( Mezes Hall )" value="MEZ ( Mezes Hall )"/>
<Picker.Item label="MFH ( Richard Mithoff Trk/Scr Fieldhouse )" value="MFH ( Richard Mithoff Trk/Scr Fieldhouse )"/>
<Picker.Item label="MHD ( Moore-Hill Dormitory )" value="MHD ( Moore-Hill Dormitory )"/>
<Picker.Item label="MMS ( Mike A. Myers Track & Soccer Stadium )" value="MMS ( Mike A. Myers Track & Soccer Stadium )"/>
<Picker.Item label="MNC ( Moncrief-Neuhaus Athletic Center )" value="MNC ( Moncrief-Neuhaus Athletic Center )"/>
<Picker.Item label="MRH ( Music Building & Recital Hall )" value="MRH ( Music Building & Recital Hall )"/>
<Picker.Item label="MSB ( 2207 Comal (Mail Service Building) )" value="MSB ( 2207 Comal (Mail Service Building) )"/>
<Picker.Item label="MTC ( Material Transfer Center )" value="MTC ( Material Transfer Center )"/>
<Picker.Item label="NEZ ( North End Zone Building )" value="NEZ ( North End Zone Building )"/>
<Picker.Item label="NHB ( Norman Hackerman Building )" value="NHB ( Norman Hackerman Building )"/>
<Picker.Item label="NMS ( Neural and Molecular Science Bldg. )" value="NMS ( Neural and Molecular Science Bldg. )"/>
<Picker.Item label="NOA ( North Office Building A )" value="NOA ( North Office Building A )"/>
<Picker.Item label="NUR ( Nursing School )" value="NUR ( Nursing School )"/>
<Picker.Item label="PA1 ( Power Plant Annex Storehouse # 1 )" value="PA1 ( Power Plant Annex Storehouse # 1 )"/>
<Picker.Item label="PA3 ( Power Plant Annex Storehouse #3-Wd )" value="PA3 ( Power Plant Annex Storehouse #3-Wd )"/>
<Picker.Item label="PA4 ( Power Plant Annex Storehouse #4-Met )" value="PA4 ( Power Plant Annex Storehouse #4-Met )"/>
<Picker.Item label="PAC ( Performing Arts Center )" value="PAC ( Performing Arts Center )"/>
<Picker.Item label="PAI ( T.S. Painter Hall )" value="PAI ( T.S. Painter Hall )"/>
<Picker.Item label="PAR ( Parlin Hall )" value="PAR ( Parlin Hall )"/>
<Picker.Item label="PAT ( J.T. Patterson Labs Bldg. )" value="PAT ( J.T. Patterson Labs Bldg. )"/>
<Picker.Item label="PB2 ( Power Plant Aux. Bldg.# 2 )" value="PB2 ( Power Plant Aux. Bldg.# 2 )"/>
<Picker.Item label="PB5 ( Power Plant Aux. Bldg.# 5 )" value="PB5 ( Power Plant Aux. Bldg.# 5 )"/>
<Picker.Item label="PB6 ( Power Plant Aux. Bldg.# 6 )" value="PB6 ( Power Plant Aux. Bldg.# 6 )"/>
<Picker.Item label="PCL ( Perry-Castaneda Library )" value="PCL ( Perry-Castaneda Library )"/>
<Picker.Item label="PH1 ( Athletic Fields Pump House (North) )" value="PH1 ( Athletic Fields Pump House (North) )"/>
<Picker.Item label="PH2 ( Athletic Fields Pump House (South) )" value="PH2 ( Athletic Fields Pump House (South) )"/>
<Picker.Item label="PHD ( Prather Hall Dormitory )" value="PHD ( Prather Hall Dormitory )"/>
<Picker.Item label="PHR ( Pharmacy Building )" value="PHR ( Pharmacy Building )"/>
<Picker.Item label="POB ( Peter O'Donnell Jr. Building )" value="POB ( Peter O'Donnell Jr. Building )"/>
<Picker.Item label="PPA ( Hal C. Weaver Power Plant Annex )" value="PPA ( Hal C. Weaver Power Plant Annex )"/>
<Picker.Item label="PPE ( Hal C Weaver Power Plant Expansion )" value="PPE ( Hal C Weaver Power Plant Expansion )"/>
<Picker.Item label="PPL ( Hal C. Weaver Power Plant )" value="PPL ( Hal C. Weaver Power Plant )"/>
<Picker.Item label="PRH ( Dobie Paisano Ranch House )" value="PRH ( Dobie Paisano Ranch House )"/>
<Picker.Item label="QTR ( Quarters Building )" value="QTR ( Quarters Building )"/>
<Picker.Item label="RHD ( Roberts Hall Dormitory )" value="RHD ( Roberts Hall Dormitory )"/>
<Picker.Item label="RHG ( Rowling Hall Garage )" value="RHG ( Rowling Hall Garage )"/>
<Picker.Item label="RLM ( Robert Lee Moore Hall )" value="RLM ( Robert Lee Moore Hall )"/>
<Picker.Item label="RLP ( Patton Hall )" value="RLP ( Patton Hall )"/>
<Picker.Item label="ROW ( Intercollegiate Rowing Boat House )" value="ROW ( Intercollegiate Rowing Boat House )"/>
<Picker.Item label="RRH ( Robert B. Rowling Hall )" value="RRH ( Robert B. Rowling Hall )"/>
<Picker.Item label="RSC ( Recreational Sports Center )" value="RSC ( Recreational Sports Center )"/>
<Picker.Item label="SAC ( Student Activity Center )" value="SAC ( Student Activity Center )"/>
<Picker.Item label="SAG ( San Antonio Garage )" value="SAG ( San Antonio Garage )"/>
<Picker.Item label="SBS ( Red and Charline McCombs Field )" value="SBS ( Red and Charline McCombs Field )"/>
<Picker.Item label="SEA ( Sarah M. & Charles E. Seay Building )" value="SEA ( Sarah M. & Charles E. Seay Building )"/>
<Picker.Item label="SER ( Service Building )" value="SER ( Service Building )"/>
<Picker.Item label="SJG ( San Jacinto Garage )" value="SJG ( San Jacinto Garage )"/>
<Picker.Item label="SJH ( San Jacinto Residence Hall )" value="SJH ( San Jacinto Residence Hall )"/>
<Picker.Item label="SOF ( Telecomm.Svc.Satellite Ops Facility )" value="SOF ( Telecomm.Svc.Satellite Ops Facility )"/>
<Picker.Item label="SRH ( Sid Richardson Hall )" value="SRH ( Sid Richardson Hall )"/>
<Picker.Item label="SSB ( Student Services Building )" value="SSB ( Student Services Building )"/>
<Picker.Item label="SSW ( School of Social Work Building )" value="SSW ( School of Social Work Building )"/>
<Picker.Item label="STD ( Darrell K Royal TX Memorial Stadium )" value="STD ( Darrell K Royal TX Memorial Stadium )"/>
<Picker.Item label="SUT ( Sutton Hall )" value="SUT ( Sutton Hall )"/>
<Picker.Item label="SW7 ( 2617 Speedway (Ofc.Bldg.) )" value="SW7 ( 2617 Speedway (Ofc.Bldg.) )"/>
<Picker.Item label="SWG ( Speedway Garage )" value="SWG ( Speedway Garage )"/>
<Picker.Item label="SZB ( George I. Sanchez Building )" value="SZB ( George I. Sanchez Building )"/>
<Picker.Item label="TCC ( Joe C Thompson Conference Center )" value="TCC ( Joe C Thompson Conference Center )"/>
<Picker.Item label="TCP ( Texas Cowboys Pavilion )" value="TCP ( Texas Cowboys Pavilion )"/>
<Picker.Item label="TES ( Thermal Energy Storage )" value="TES ( Thermal Energy Storage )"/>
<Picker.Item label="TMM ( Texas Memorial Museum )" value="TMM ( Texas Memorial Museum )"/>
<Picker.Item label="TNH ( Townes Hall )" value="TNH ( Townes Hall )"/>
<Picker.Item label="TRG ( Trinity Garage )" value="TRG ( Trinity Garage )"/>
<Picker.Item label="TSB ( Tennis Support Building )" value="TSB ( Tennis Support Building )"/>
<Picker.Item label="TSC ( Lee & Joe Jamail Texas Swimming Ctr )" value="TSC ( Lee & Joe Jamail Texas Swimming Ctr )"/>
<Picker.Item label="TSG ( 27th Street Garage )" value="TSG ( 27th Street Garage )"/>
<Picker.Item label="TTC ( Texas Tennis Center )" value="TTC ( Texas Tennis Center )"/>
<Picker.Item label="UA9 ( 2609 University Avenue )" value="UA9 ( 2609 University Avenue )"/>
<Picker.Item label="UIL ( Univ. Interscholastic League Bldg. )" value="UIL ( Univ. Interscholastic League Bldg. )"/>
<Picker.Item label="UNB ( Union Building )" value="UNB ( Union Building )"/>
<Picker.Item label="UPB ( University Police Building )" value="UPB ( University Police Building )"/>
<Picker.Item label="UTA ( UT Administration Building )" value="UTA ( UT Administration Building )"/>
<Picker.Item label="UTC ( University Teaching Center )" value="UTC ( University Teaching Center )"/>
<Picker.Item label="UTX ( Etter-Harbin Alumni Center )" value="UTX ( Etter-Harbin Alumni Center )"/>
<Picker.Item label="VRX ( KVRX Transmitter Twr & Cntrl Bldg )" value="VRX ( KVRX Transmitter Twr & Cntrl Bldg )"/>
<Picker.Item label="WAG ( Waggener Hall )" value="WAG ( Waggener Hall )"/>
<Picker.Item label="WAT ( Arthur P. Watson House )" value="WAT ( Arthur P. Watson House )"/>
<Picker.Item label="WCH ( Will C. Hogg Bldg. )" value="WCH ( Will C. Hogg Bldg. )"/>
<Picker.Item label="WCS ( Waller Creek Control Station )" value="WCS ( Waller Creek Control Station )"/>
<Picker.Item label="WEL ( Robert A. Welch Hall )" value="WEL ( Robert A. Welch Hall )"/>
<Picker.Item label="WGB ( Whitaker Gateway Building )" value="WGB ( Whitaker Gateway Building )"/>
<Picker.Item label="WIN ( F.L. Winship Drama Bldg. )" value="WIN ( F.L. Winship Drama Bldg. )"/>
<Picker.Item label="WMB ( West Mall Office Bldg. )" value="WMB ( West Mall Office Bldg. )"/>
<Picker.Item label="WRW ( W.R. Woolrich Labs. )" value="WRW ( W.R. Woolrich Labs. )"/>
<Picker.Item label="WWH ( Walter Webb Hall )" value="WWH ( Walter Webb Hall )"/>
<Picker.Item label="Castilian" value="Castilian"/>
<Picker.Item label="Skyloft" value="Skyloft"/>
<Picker.Item label="Dobie" value="Dobie"/>
        </Picker>
        <Button title="Select Your Current Location" onPress={this.clickme}/>        
       
        <Picker 
        style={{width: '100%'}}
        selectedValue={this.state.Picker2Value}
        onValueChange={(itemValue, itemIndex) => this.setState({Picker2Value: itemValue})}
        >
        <Picker.Item label="Select an option" value=""/>
        <Picker.Item label="ADH ( Almetris Duren Residence Hall )" value="ADH ( Almetris Duren Residence Hall )"/>
<Picker.Item label="AF1 ( Athletic Fields Pavilion (Rehab) )" value="AF1 ( Athletic Fields Pavilion (Rehab) )"/>
<Picker.Item label="AF2 ( Athletic Fields Pavilion (Eastside) )" value="AF2 ( Athletic Fields Pavilion (Eastside) )"/>
<Picker.Item label="AFP ( Athletic Fields Pavilion )" value="AFP ( Athletic Fields Pavilion )"/>
<Picker.Item label="AHG ( Anna Hiss Gymnasium )" value="AHG ( Anna Hiss Gymnasium )"/>
<Picker.Item label="ANB ( Arno Nowotny Building )" value="ANB ( Arno Nowotny Building )"/>
<Picker.Item label="AND ( Andrews Dormitory )" value="AND ( Andrews Dormitory )"/>
<Picker.Item label="ARC ( Animal Resources Center )" value="ARC ( Animal Resources Center )"/>
<Picker.Item label="ART ( Art Building and Museum )" value="ART ( Art Building and Museum )"/>
<Picker.Item label="ATT ( AT&T Executive Educ & Conf Center )" value="ATT ( AT&T Executive Educ & Conf Center )"/>
<Picker.Item label="BAT ( Batts Hall )" value="BAT ( Batts Hall )"/>
<Picker.Item label="BEL ( L. Theo Bellmont Hall )" value="BEL ( L. Theo Bellmont Hall )"/>
<Picker.Item label="BEN ( Benedict Hall )" value="BEN ( Benedict Hall )"/>
<Picker.Item label="BGH ( Biological Sciences Greenhouses )" value="BGH ( Biological Sciences Greenhouses )"/>
<Picker.Item label="BHD ( Brackenridge Hall Dorm )" value="BHD ( Brackenridge Hall Dorm )"/>
<Picker.Item label="BIO ( Biological Laboratories )" value="BIO ( Biological Laboratories )"/>
<Picker.Item label="BLD ( Blanton Dormitory )" value="BLD ( Blanton Dormitory )"/>
<Picker.Item label="BMA ( Jack S. Blanton Museum of Art )" value="BMA ( Jack S. Blanton Museum of Art )"/>
<Picker.Item label="BMC ( Belo Center for New Media )" value="BMC ( Belo Center for New Media )"/>
<Picker.Item label="BME ( Biomedical Engineering Building )" value="BME ( Biomedical Engineering Building )"/>
<Picker.Item label="BMK ( Blanton Museum Ellsworth Kelly )" value="BMK ( Blanton Museum Ellsworth Kelly )"/>
<Picker.Item label="BMS ( Blanton Museum Smith Building )" value="BMS ( Blanton Museum Smith Building )"/>
<Picker.Item label="BOT ( Biological Greenhouse )" value="BOT ( Biological Greenhouse )"/>
<Picker.Item label="BRB ( Bernard and Audre Rapoport Center )" value="BRB ( Bernard and Audre Rapoport Center )"/>
<Picker.Item label="BRG ( Brazos Garage )" value="BRG ( Brazos Garage )"/>
<Picker.Item label="BSB ( Basketball Support Bldg (RecSport) )" value="BSB ( Basketball Support Bldg (RecSport) )"/>
<Picker.Item label="BTL ( Battle Hall )" value="BTL ( Battle Hall )"/>
<Picker.Item label="BUR ( Burdine Hall )" value="BUR ( Burdine Hall )"/>
<Picker.Item label="BWY ( 2616 Wichita (Bridgeway) )" value="BWY ( 2616 Wichita (Bridgeway) )"/>
<Picker.Item label="CAL ( Calhoun Hall )" value="CAL ( Calhoun Hall )"/>
<Picker.Item label="CBA ( College of Business Administration )" value="CBA ( College of Business Administration )"/>
<Picker.Item label="CCG ( Conference Center Garage )" value="CCG ( Conference Center Garage )"/>
<Picker.Item label="CCJ ( John B. Connally Center for Justice )" value="CCJ ( John B. Connally Center for Justice )"/>
<Picker.Item label="CDA ( Comal Child Development Ctr Annex )" value="CDA ( Comal Child Development Ctr Annex )"/>
<Picker.Item label="CDL ( Collections Deposit Library )" value="CDL ( Collections Deposit Library )"/>
<Picker.Item label="CEE ( Continuing Engineering Education )" value="CEE ( Continuing Engineering Education )"/>
<Picker.Item label="CLK ( Caven Clark Field Support Building )" value="CLK ( Caven Clark Field Support Building )"/>
<Picker.Item label="CMA ( Jesse H. Jones Comm. Ctr. (Bldg. A) )" value="CMA ( Jesse H. Jones Comm. Ctr. (Bldg. A) )"/>
<Picker.Item label="CMB ( Jesse H. Jones Comm. Ctr. (Bldg. B) )" value="CMB ( Jesse H. Jones Comm. Ctr. (Bldg. B) )"/>
<Picker.Item label="CML ( Comal St. Child Development Center )" value="CML ( Comal St. Child Development Center )"/>
<Picker.Item label="COM ( Computation Center )" value="COM ( Computation Center )"/>
<Picker.Item label="CPB ( Compactor Building )" value="CPB ( Compactor Building )"/>
<Picker.Item label="CPC ( Cpc Field Staff Office )" value="CPC ( Cpc Field Staff Office )"/>
<Picker.Item label="CPE ( Chemical and Petroleum Engineering )" value="CPE ( Chemical and Petroleum Engineering )"/>
<Picker.Item label="CRB ( Computational Resource Building )" value="CRB ( Computational Resource Building )"/>
<Picker.Item label="CRD ( Carothers Dormitory )" value="CRD ( Carothers Dormitory )"/>
<Picker.Item label="CRH ( Creekside Residence Hall )" value="CRH ( Creekside Residence Hall )"/>
<Picker.Item label="CS3 ( Central Chilling Station No. 3 )" value="CS3 ( Central Chilling Station No. 3 )"/>
<Picker.Item label="CS4 ( Central Chilling Station No. 4 )" value="CS4 ( Central Chilling Station No. 4 )"/>
<Picker.Item label="CS5 ( Central Chilling Station No. 5 )" value="CS5 ( Central Chilling Station No. 5 )"/>
<Picker.Item label="CS6 ( Central Chilling Station No. 6 )" value="CS6 ( Central Chilling Station No. 6 )"/>
<Picker.Item label="CS7 ( Central Chilling Station No. 7 )" value="CS7 ( Central Chilling Station No. 7 )"/>
<Picker.Item label="CSS ( Carothers Dorm Substation )" value="CSS ( Carothers Dorm Substation )"/>
<Picker.Item label="CT1 ( Cooling Tower 1 )" value="CT1 ( Cooling Tower 1 )"/>
<Picker.Item label="DCP ( Denton A. Cooley Pavilion )" value="DCP ( Denton A. Cooley Pavilion )"/>
<Picker.Item label="DEV ( Development Office Building )" value="DEV ( Development Office Building )"/>
<Picker.Item label="DFA ( E. William Doty Fine Arts Building )" value="DFA ( E. William Doty Fine Arts Building )"/>
<Picker.Item label="DFF ( UFCU Disch-Falk Field )" value="DFF ( UFCU Disch-Falk Field )"/>
<Picker.Item label="DPI ( Dell Pediatric Research Institute )" value="DPI ( Dell Pediatric Research Institute )"/>
<Picker.Item label="DTB ( Dinosaur Trackway Bldg. )" value="DTB ( Dinosaur Trackway Bldg. )"/>
<Picker.Item label="E10 ( Equipment Storehouse # 10 )" value="E10 ( Equipment Storehouse # 10 )"/>
<Picker.Item label="E11 ( Equipment Storehouse # 11 )" value="E11 ( Equipment Storehouse # 11 )"/>
<Picker.Item label="E12 ( Equipment Storehouse # 12 )" value="E12 ( Equipment Storehouse # 12 )"/>
<Picker.Item label="E13 ( Equipment Storehouse # 13 )" value="E13 ( Equipment Storehouse # 13 )"/>
<Picker.Item label="E15 ( Equipment Storehouse # 15 )" value="E15 ( Equipment Storehouse # 15 )"/>
<Picker.Item label="E23 ( Equipment Storehouse # 23 )" value="E23 ( Equipment Storehouse # 23 )"/>
<Picker.Item label="E24 ( Equipment Storehouse # 24 )" value="E24 ( Equipment Storehouse # 24 )"/>
<Picker.Item label="E25 ( Equipment Storehouse # 25 )" value="E25 ( Equipment Storehouse # 25 )"/>
<Picker.Item label="E26 ( Equipment Storehouse #26 )" value="E26 ( Equipment Storehouse #26 )"/>
<Picker.Item label="ECG ( East Campus Garage )" value="ECG ( East Campus Garage )"/>
<Picker.Item label="ECJ ( Ernest Cockrell Jr. Hall )" value="ECJ ( Ernest Cockrell Jr. Hall )"/>
<Picker.Item label="EER ( Engr Education and Research Center )" value="EER ( Engr Education and Research Center )"/>
<Picker.Item label="EHZ ( ETC Hazmat Storage Building )" value="EHZ ( ETC Hazmat Storage Building )"/>
<Picker.Item label="EPS ( E.P. Schoch Building )" value="EPS ( E.P. Schoch Building )"/>
<Picker.Item label="ERC ( Frank C Erwin Special Events Center )" value="ERC ( Frank C Erwin Special Events Center )"/>
<Picker.Item label="ETC ( Engineering Teaching Center II )" value="ETC ( Engineering Teaching Center II )"/>
<Picker.Item label="FAC ( Peter T. Flawn Academic Center )" value="FAC ( Peter T. Flawn Academic Center )"/>
<Picker.Item label="FC1 ( Facilities Complex Bldg. 1 )" value="FC1 ( Facilities Complex Bldg. 1 )"/>
<Picker.Item label="FC2 ( Facilities Complex Bldg. 2 )" value="FC2 ( Facilities Complex Bldg. 2 )"/>
<Picker.Item label="FC3 ( Facilities Complex Bldg. 3 )" value="FC3 ( Facilities Complex Bldg. 3 )"/>
<Picker.Item label="FC4 ( Facilities Complex Bldg. 4 )" value="FC4 ( Facilities Complex Bldg. 4 )"/>
<Picker.Item label="FC5 ( Facilities Complex Bldg. 5 )" value="FC5 ( Facilities Complex Bldg. 5 )"/>
<Picker.Item label="FC6 ( Facilities Complex Bldg. 6 )" value="FC6 ( Facilities Complex Bldg. 6 )"/>
<Picker.Item label="FC7 ( Facilities Complex Bldg. 7 )" value="FC7 ( Facilities Complex Bldg. 7 )"/>
<Picker.Item label="FC8 ( Facilities Complex Bldg. 8 )" value="FC8 ( Facilities Complex Bldg. 8 )"/>
<Picker.Item label="FC9 ( Custodial Services Training Fac )" value="FC9 ( Custodial Services Training Fac )"/>
<Picker.Item label="FCS ( Fountain Control Structure )" value="FCS ( Fountain Control Structure )"/>
<Picker.Item label="FDH ( J. Frank Dobie House )" value="FDH ( J. Frank Dobie House )"/>
<Picker.Item label="FNT ( Larry R. Faulkner Nanosci. and Tech )" value="FNT ( Larry R. Faulkner Nanosci. and Tech )"/>
<Picker.Item label="FSB ( Flammable Storage Building )" value="FSB ( Flammable Storage Building )"/>
<Picker.Item label="G01 ( Traffic Kiosk - 2000 San Jacinto )" value="G01 ( Traffic Kiosk - 2000 San Jacinto )"/>
<Picker.Item label="G02 ( Traffic Kiosk - 2400 San Jacinto )" value="G02 ( Traffic Kiosk - 2400 San Jacinto )"/>
<Picker.Item label="G05 ( Traffic Kiosk - 100 East 21st )" value="G05 ( Traffic Kiosk - 100 East 21st )"/>
<Picker.Item label="G06 ( Traffic Kiosk - 400 East 23rd )" value="G06 ( Traffic Kiosk - 400 East 23rd )"/>
<Picker.Item label="G07 ( Traffic Kiosk - 200 West 24th )" value="G07 ( Traffic Kiosk - 200 West 24th )"/>
<Picker.Item label="G11 ( Parking Kiosk - Lot 40 )" value="G11 ( Parking Kiosk - Lot 40 )"/>
<Picker.Item label="GAR ( Garrison Hall )" value="GAR ( Garrison Hall )"/>
<Picker.Item label="GDC ( Gates Dell Complex )" value="GDC ( Gates Dell Complex )"/>
<Picker.Item label="GEA ( Mary E. Gearing Hall )" value="GEA ( Mary E. Gearing Hall )"/>
<Picker.Item label="GEB ( Dorothy L. Gebauer Building )" value="GEB ( Dorothy L. Gebauer Building )"/>
<Picker.Item label="GOL ( Goldsmith Hall )" value="GOL ( Goldsmith Hall )"/>
<Picker.Item label="GRC ( Gregory Aquatic Pool Control Bldg. )" value="GRC ( Gregory Aquatic Pool Control Bldg. )"/>
<Picker.Item label="GRE ( Gregory Gymnasium )" value="GRE ( Gregory Gymnasium )"/>
<Picker.Item label="GRF ( Gregory Aquatic Food Service Bldg. )" value="GRF ( Gregory Aquatic Food Service Bldg. )"/>
<Picker.Item label="GRP ( Gregory Aquatic Pool Equip. Bldg. )" value="GRP ( Gregory Aquatic Pool Equip. Bldg. )"/>
<Picker.Item label="GRS ( Gregory Aquatic Pool Storage Bldg. )" value="GRS ( Gregory Aquatic Pool Storage Bldg. )"/>
<Picker.Item label="GSB ( Graduate School of Business Bldg. )" value="GSB ( Graduate School of Business Bldg. )"/>
<Picker.Item label="GUG ( Guadalupe Garage )" value="GUG ( Guadalupe Garage )"/>
<Picker.Item label="GWB ( Gordon-White Building )" value="GWB ( Gordon-White Building )"/>
<Picker.Item label="HCG ( Health Center Garage )" value="HCG ( Health Center Garage )"/>
<Picker.Item label="HDB ( Health Discovery Building )" value="HDB ( Health Discovery Building )"/>
<Picker.Item label="HLB ( Health Learning Building )" value="HLB ( Health Learning Building )"/>
<Picker.Item label="HLP ( Hartland Plaza-School of Social Wrk )" value="HLP ( Hartland Plaza-School of Social Wrk )"/>
<Picker.Item label="HMA ( Hogg Memorial Auditorium )" value="HMA ( Hogg Memorial Auditorium )"/>
<Picker.Item label="HRC ( Harry Ransom Center )" value="HRC ( Harry Ransom Center )"/>
<Picker.Item label="HRH ( Rainey Hall )" value="HRH ( Rainey Hall )"/>
<Picker.Item label="HSM ( William Randolph Hearst Bldg )" value="HSM ( William Randolph Hearst Bldg )"/>
<Picker.Item label="HTB ( Health Transformation Building )" value="HTB ( Health Transformation Building )"/>
<Picker.Item label="IC2 ( 2815 San Gabriel (IC2 Institute) )" value="IC2 ( 2815 San Gabriel (IC2 Institute) )"/>
<Picker.Item label="Abbr. ( Name )" value="Abbr. ( Name )"/>
<Picker.Item label="ICB ( Intramural Control Bldg. )" value="ICB ( Intramural Control Bldg. )"/>
<Picker.Item label="IMA ( Intramural Maint Bldg A )" value="IMA ( Intramural Maint Bldg A )"/>
<Picker.Item label="IMB ( Intramural Maint Bldg B )" value="IMB ( Intramural Maint Bldg B )"/>
<Picker.Item label="IPF ( Indoor Practice Facility )" value="IPF ( Indoor Practice Facility )"/>
<Picker.Item label="JCD ( Jester Dormitory )" value="JCD ( Jester Dormitory )"/>
<Picker.Item label="JES ( Beauford H. Jester Center )" value="JES ( Beauford H. Jester Center )"/>
<Picker.Item label="JGB ( Jackson Geological Sciences Bldg. )" value="JGB ( Jackson Geological Sciences Bldg. )"/>
<Picker.Item label="JHH ( John W. Hargis Hall )" value="JHH ( John W. Hargis Hall )"/>
<Picker.Item label="JON ( Jesse H. Jones Hall )" value="JON ( Jesse H. Jones Hall )"/>
<Picker.Item label="KIN ( Kinsolving Dormitory )" value="KIN ( Kinsolving Dormitory )"/>
<Picker.Item label="LAC ( Lake Austin Centre )" value="LAC ( Lake Austin Centre )"/>
<Picker.Item label="LBJ ( Lyndon B Johnson Library )" value="LBJ ( Lyndon B Johnson Library )"/>
<Picker.Item label="LCD ( Lavaca St. Child Development Center )" value="LCD ( Lavaca St. Child Development Center )"/>
<Picker.Item label="LCH ( Littlefield Carriage House )" value="LCH ( Littlefield Carriage House )"/>
<Picker.Item label="LDH ( Longhorn Dining Facility )" value="LDH ( Longhorn Dining Facility )"/>
<Picker.Item label="LFH ( Littlefield Home )" value="LFH ( Littlefield Home )"/>
<Picker.Item label="LLA ( Living Learning Hall A )" value="LLA ( Living Learning Hall A )"/>
<Picker.Item label="LLB ( Living Learning Hall B )" value="LLB ( Living Learning Hall B )"/>
<Picker.Item label="LLC ( Living Learning Hall C )" value="LLC ( Living Learning Hall C )"/>
<Picker.Item label="LLD ( Living Learning Hall D )" value="LLD ( Living Learning Hall D )"/>
<Picker.Item label="LLE ( Living Learning Hall E )" value="LLE ( Living Learning Hall E )"/>
<Picker.Item label="LLF ( Living Learning Hall F )" value="LLF ( Living Learning Hall F )"/>
<Picker.Item label="LS1 ( Landscape Services Storage Bldg. )" value="LS1 ( Landscape Services Storage Bldg. )"/>
<Picker.Item label="LTD ( Littlefield Dormitory )" value="LTD ( Littlefield Dormitory )"/>
<Picker.Item label="LTH ( Laboratory Theater Bldg. )" value="LTH ( Laboratory Theater Bldg. )"/>
<Picker.Item label="MAG ( Manor Garage )" value="MAG ( Manor Garage )"/>
<Picker.Item label="MAI ( Main Building )" value="MAI ( Main Building )"/>
<Picker.Item label="MB1 ( Modular Building #1 )" value="MB1 ( Modular Building #1 )"/>
<Picker.Item label="MBB ( Moffett Molecular Biology Bldg. )" value="MBB ( Moffett Molecular Biology Bldg. )"/>
<Picker.Item label="MEZ ( Mezes Hall )" value="MEZ ( Mezes Hall )"/>
<Picker.Item label="MFH ( Richard Mithoff Trk/Scr Fieldhouse )" value="MFH ( Richard Mithoff Trk/Scr Fieldhouse )"/>
<Picker.Item label="MHD ( Moore-Hill Dormitory )" value="MHD ( Moore-Hill Dormitory )"/>
<Picker.Item label="MMS ( Mike A. Myers Track & Soccer Stadium )" value="MMS ( Mike A. Myers Track & Soccer Stadium )"/>
<Picker.Item label="MNC ( Moncrief-Neuhaus Athletic Center )" value="MNC ( Moncrief-Neuhaus Athletic Center )"/>
<Picker.Item label="MRH ( Music Building & Recital Hall )" value="MRH ( Music Building & Recital Hall )"/>
<Picker.Item label="MSB ( 2207 Comal (Mail Service Building) )" value="MSB ( 2207 Comal (Mail Service Building) )"/>
<Picker.Item label="MTC ( Material Transfer Center )" value="MTC ( Material Transfer Center )"/>
<Picker.Item label="NEZ ( North End Zone Building )" value="NEZ ( North End Zone Building )"/>
<Picker.Item label="NHB ( Norman Hackerman Building )" value="NHB ( Norman Hackerman Building )"/>
<Picker.Item label="NMS ( Neural and Molecular Science Bldg. )" value="NMS ( Neural and Molecular Science Bldg. )"/>
<Picker.Item label="NOA ( North Office Building A )" value="NOA ( North Office Building A )"/>
<Picker.Item label="NUR ( Nursing School )" value="NUR ( Nursing School )"/>
<Picker.Item label="PA1 ( Power Plant Annex Storehouse # 1 )" value="PA1 ( Power Plant Annex Storehouse # 1 )"/>
<Picker.Item label="PA3 ( Power Plant Annex Storehouse #3-Wd )" value="PA3 ( Power Plant Annex Storehouse #3-Wd )"/>
<Picker.Item label="PA4 ( Power Plant Annex Storehouse #4-Met )" value="PA4 ( Power Plant Annex Storehouse #4-Met )"/>
<Picker.Item label="PAC ( Performing Arts Center )" value="PAC ( Performing Arts Center )"/>
<Picker.Item label="PAI ( T.S. Painter Hall )" value="PAI ( T.S. Painter Hall )"/>
<Picker.Item label="PAR ( Parlin Hall )" value="PAR ( Parlin Hall )"/>
<Picker.Item label="PAT ( J.T. Patterson Labs Bldg. )" value="PAT ( J.T. Patterson Labs Bldg. )"/>
<Picker.Item label="PB2 ( Power Plant Aux. Bldg.# 2 )" value="PB2 ( Power Plant Aux. Bldg.# 2 )"/>
<Picker.Item label="PB5 ( Power Plant Aux. Bldg.# 5 )" value="PB5 ( Power Plant Aux. Bldg.# 5 )"/>
<Picker.Item label="PB6 ( Power Plant Aux. Bldg.# 6 )" value="PB6 ( Power Plant Aux. Bldg.# 6 )"/>
<Picker.Item label="PCL ( Perry-Castaneda Library )" value="PCL ( Perry-Castaneda Library )"/>
<Picker.Item label="PH1 ( Athletic Fields Pump House (North) )" value="PH1 ( Athletic Fields Pump House (North) )"/>
<Picker.Item label="PH2 ( Athletic Fields Pump House (South) )" value="PH2 ( Athletic Fields Pump House (South) )"/>
<Picker.Item label="PHD ( Prather Hall Dormitory )" value="PHD ( Prather Hall Dormitory )"/>
<Picker.Item label="PHR ( Pharmacy Building )" value="PHR ( Pharmacy Building )"/>
<Picker.Item label="POB ( Peter O'Donnell Jr. Building )" value="POB ( Peter O'Donnell Jr. Building )"/>
<Picker.Item label="PPA ( Hal C. Weaver Power Plant Annex )" value="PPA ( Hal C. Weaver Power Plant Annex )"/>
<Picker.Item label="PPE ( Hal C Weaver Power Plant Expansion )" value="PPE ( Hal C Weaver Power Plant Expansion )"/>
<Picker.Item label="PPL ( Hal C. Weaver Power Plant )" value="PPL ( Hal C. Weaver Power Plant )"/>
<Picker.Item label="PRH ( Dobie Paisano Ranch House )" value="PRH ( Dobie Paisano Ranch House )"/>
<Picker.Item label="QTR ( Quarters Building )" value="QTR ( Quarters Building )"/>
<Picker.Item label="RHD ( Roberts Hall Dormitory )" value="RHD ( Roberts Hall Dormitory )"/>
<Picker.Item label="RHG ( Rowling Hall Garage )" value="RHG ( Rowling Hall Garage )"/>
<Picker.Item label="RLM ( Robert Lee Moore Hall )" value="RLM ( Robert Lee Moore Hall )"/>
<Picker.Item label="RLP ( Patton Hall )" value="RLP ( Patton Hall )"/>
<Picker.Item label="ROW ( Intercollegiate Rowing Boat House )" value="ROW ( Intercollegiate Rowing Boat House )"/>
<Picker.Item label="RRH ( Robert B. Rowling Hall )" value="RRH ( Robert B. Rowling Hall )"/>
<Picker.Item label="RSC ( Recreational Sports Center )" value="RSC ( Recreational Sports Center )"/>
<Picker.Item label="SAC ( Student Activity Center )" value="SAC ( Student Activity Center )"/>
<Picker.Item label="SAG ( San Antonio Garage )" value="SAG ( San Antonio Garage )"/>
<Picker.Item label="SBS ( Red and Charline McCombs Field )" value="SBS ( Red and Charline McCombs Field )"/>
<Picker.Item label="SEA ( Sarah M. & Charles E. Seay Building )" value="SEA ( Sarah M. & Charles E. Seay Building )"/>
<Picker.Item label="SER ( Service Building )" value="SER ( Service Building )"/>
<Picker.Item label="SJG ( San Jacinto Garage )" value="SJG ( San Jacinto Garage )"/>
<Picker.Item label="SJH ( San Jacinto Residence Hall )" value="SJH ( San Jacinto Residence Hall )"/>
<Picker.Item label="SOF ( Telecomm.Svc.Satellite Ops Facility )" value="SOF ( Telecomm.Svc.Satellite Ops Facility )"/>
<Picker.Item label="SRH ( Sid Richardson Hall )" value="SRH ( Sid Richardson Hall )"/>
<Picker.Item label="SSB ( Student Services Building )" value="SSB ( Student Services Building )"/>
<Picker.Item label="SSW ( School of Social Work Building )" value="SSW ( School of Social Work Building )"/>
<Picker.Item label="STD ( Darrell K Royal TX Memorial Stadium )" value="STD ( Darrell K Royal TX Memorial Stadium )"/>
<Picker.Item label="SUT ( Sutton Hall )" value="SUT ( Sutton Hall )"/>
<Picker.Item label="SW7 ( 2617 Speedway (Ofc.Bldg.) )" value="SW7 ( 2617 Speedway (Ofc.Bldg.) )"/>
<Picker.Item label="SWG ( Speedway Garage )" value="SWG ( Speedway Garage )"/>
<Picker.Item label="SZB ( George I. Sanchez Building )" value="SZB ( George I. Sanchez Building )"/>
<Picker.Item label="TCC ( Joe C Thompson Conference Center )" value="TCC ( Joe C Thompson Conference Center )"/>
<Picker.Item label="TCP ( Texas Cowboys Pavilion )" value="TCP ( Texas Cowboys Pavilion )"/>
<Picker.Item label="TES ( Thermal Energy Storage )" value="TES ( Thermal Energy Storage )"/>
<Picker.Item label="TMM ( Texas Memorial Museum )" value="TMM ( Texas Memorial Museum )"/>
<Picker.Item label="TNH ( Townes Hall )" value="TNH ( Townes Hall )"/>
<Picker.Item label="TRG ( Trinity Garage )" value="TRG ( Trinity Garage )"/>
<Picker.Item label="TSB ( Tennis Support Building )" value="TSB ( Tennis Support Building )"/>
<Picker.Item label="TSC ( Lee & Joe Jamail Texas Swimming Ctr )" value="TSC ( Lee & Joe Jamail Texas Swimming Ctr )"/>
<Picker.Item label="TSG ( 27th Street Garage )" value="TSG ( 27th Street Garage )"/>
<Picker.Item label="TTC ( Texas Tennis Center )" value="TTC ( Texas Tennis Center )"/>
<Picker.Item label="UA9 ( 2609 University Avenue )" value="UA9 ( 2609 University Avenue )"/>
<Picker.Item label="UIL ( Univ. Interscholastic League Bldg. )" value="UIL ( Univ. Interscholastic League Bldg. )"/>
<Picker.Item label="UNB ( Union Building )" value="UNB ( Union Building )"/>
<Picker.Item label="UPB ( University Police Building )" value="UPB ( University Police Building )"/>
<Picker.Item label="UTA ( UT Administration Building )" value="UTA ( UT Administration Building )"/>
<Picker.Item label="UTC ( University Teaching Center )" value="UTC ( University Teaching Center )"/>
<Picker.Item label="UTX ( Etter-Harbin Alumni Center )" value="UTX ( Etter-Harbin Alumni Center )"/>
<Picker.Item label="VRX ( KVRX Transmitter Twr & Cntrl Bldg )" value="VRX ( KVRX Transmitter Twr & Cntrl Bldg )"/>
<Picker.Item label="WAG ( Waggener Hall )" value="WAG ( Waggener Hall )"/>
<Picker.Item label="WAT ( Arthur P. Watson House )" value="WAT ( Arthur P. Watson House )"/>
<Picker.Item label="WCH ( Will C. Hogg Bldg. )" value="WCH ( Will C. Hogg Bldg. )"/>
<Picker.Item label="WCS ( Waller Creek Control Station )" value="WCS ( Waller Creek Control Station )"/>
<Picker.Item label="WEL ( Robert A. Welch Hall )" value="WEL ( Robert A. Welch Hall )"/>
<Picker.Item label="WGB ( Whitaker Gateway Building )" value="WGB ( Whitaker Gateway Building )"/>
<Picker.Item label="WIN ( F.L. Winship Drama Bldg. )" value="WIN ( F.L. Winship Drama Bldg. )"/>
<Picker.Item label="WMB ( West Mall Office Bldg. )" value="WMB ( West Mall Office Bldg. )"/>
<Picker.Item label="WRW ( W.R. Woolrich Labs. )" value="WRW ( W.R. Woolrich Labs. )"/>
<Picker.Item label="WWH ( Walter Webb Hall )" value="WWH ( Walter Webb Hall )"/>
<Picker.Item label="Castilian" value="Castilian"/>
<Picker.Item label="Skyloft" value="Skyloft"/>
<Picker.Item label="Dobie" value="Dobie"/>
        </Picker>
        <Button title="Select Your Destination" onPress={this.clicker}/> 
        <Button 
          onPress={() => fetch('https://react-test-79a3b.firebaseio.com/queue.json', {
                    method: 'POST',
                    body: JSON.stringify({
                      name: this.state.name,
                      phone: this.state.phone,
                      pickup: this.state.pickup,
                      dropoff: this.state.dropoff,
                      timestamp: this.state.timestamp,
                      notes: this.state.notes,
                      numRiders: this.state.numRiders,
                      driverID: this.state.driverID,
                      campus: this.state.campus,
                      status: this.state.status,
                    })
                  })}
          title="Submit Ride Request"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E87636',
  }
});
