
       
        <div class="block-box ">
        <div class="signup-top1">
            <h2>Welcome to CRC</h2>
        </div>
        <div class="form-block">
            <form class="form-horizontal" id="user-register" role="form" method="POST" action="/register">
                <h3>Step 1 :</h3>
                <div class="form-details">

                    <a class="rowval">
                        <input type="text" class="fname" name="firstname" placeholder="First Name">
                    </a>

                    <a class="rowval">
                        <input type="text" class="fname" name="lastname" placeholder="Last Name">
                    </a>

                    <a class="rowval">
                        <input type="email" class="email btn-input" name="email" placeholder="Email">
                    </a>

                </div>

                <h3>Step 2 :</h3>

                <div class="form-details">

                    <a class="rowval">
                        <input type="text" class="cname" name="username" placeholder="User Name">
                    </a>

                    <a class="rowval">
                        <input type="text" id="datepicker" class="cname" name="dob" value="" placeholder="Date Of Birth">
                    </a>

                    <a class="rowval">
                        <input type="password" name="password" id="password" placeholder="Password">
                    </a>

                    <a class="rowval">
                        <input type="password" class="btn-input" name="conform_password" placeholder="Confirm Password">
                    </a>

                </div>

                <h3>Step 3 :</h3>

                <div class="form-details form-row">

                    <a class="rowval">
                        <select name="gender" id="gender-type" class="fname">
                            <option value="" selected disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </a>

                    <a class="rowval">
                        <input type="number" class="cname" name="mobile_no" placeholder="Mobile number">
                    </a>

                    <a class="rowval">
                        <input type="text" class="btn-input cname" name="address" placeholder="Your Address">
                    </a>

                </div>
                <h3>Step 4 :</h3>

                <div class="form-details form-row">



                    <a class="rowval">
                        <input type="text" class="cname" name="highschool_marks" placeholder="10th Marks/CGPA">
                    </a>

                    <a class="rowval">
                        <input type="text" class="cname" name="Intermediate_marks" placeholder="12th Marks">
                    </a>

                    <a class="rowval">
                        <select name="course" id="course" class="fname">
                        </select>
                    </a>

                    <a class="rowval">
                        <select name="branch" id="branch" class="fname_more" value="" onchange="myFunction()">
                        </select>
                    </a>


                    <div class="rowval">

                        <table>
                            <tr>

                                <a class="rowval">
                                    <select name="startyear" id="startyear" class="fname" value="">
                                    </select>
                                </a>

                                <a class="rowval">
                                    <select name="endyear" id="endyear" class="fname_more" value="">
                                    </select>
                                </a>

                            </tr>
                        </table>


                        <a class="rowval">
                            <input type="text" class="cname" name="College_id" placeholder="College Id">
                        </a>

                        <a class="rowval">
                            <input type="number" class="cname" name="enroll_no" placeholder="Enrollment No">
                        </a>

                        <a class="rowval">
                            <input type="number" class="cname" name="backlogs" placeholder="Backlogs">
                        </a>

                    </div>

                    <input type="submit" value="SUBMIT" onclick="yearCheckerValidator()">
            </form>
        </div>
   