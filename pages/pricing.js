import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'
export default function Pricing() {
    return (
       <div className="pb-20 bg-gray-800 px-6 md:px-12">
       <div className="w-full text-center  py-20  ">
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-600 ">Ready to use Edufy?</h1>
          <p className="text-2xl font-medium text-gray-300 mt-2">Choose the right plan for you, and make the most of our service!</p>
        </div>

        <div className="md:flex justify-around flex-wrap">
        <div class="rounded-lg shadow-lg overflow-hidden mb-4">
    <div class="px-6 py-8 bg-white dark:bg-gray-600 sm:p-10 sm:pb-6">
        <div class="flex justify-center">
            <span class="inline-flex px-4 py-1 dark:text-white rounded-full text-sm leading-5 font-semibold tracking-wide uppercase">
                Standard Plan
            </span>
        </div>
        <div class="mt-4 flex justify-center text-6xl leading-none font-extrabold dark:text-white">
            $10
            <span class="ml-1 pt-8 text-2xl leading-8 font-medium text-gray-500 dark:text-gray-400">
                /month
            </span>
        </div>
    </div>
    <div class="px-6 pt-6 pb-8 bg-white dark:bg-gray-700 sm:p-10 sm:pt-6">
        <ul>
            <li class="mt-4 flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p class="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    $10/month 
                </p>
            </li>
            <li class="mt-4 flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p class="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    Unlimited number of projects
                </p>
            </li>
            <li class="mt-4 flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p class="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    Cancel anytime
                </p>
            </li>
        </ul>
        <div class="mt-6 rounded-md shadow">
            <a href="#" class="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                Start plan
            </a>
        </div>
    </div>
</div>
<div class="rounded-lg shadow-lg overflow-hidden mb-4">
    <div class="px-6 py-8 bg-white dark:bg-gray-600 sm:p-10 sm:pb-6">
        <div class="flex justify-center">
            <span class="inline-flex px-4 py-1 dark:text-white rounded-full text-sm leading-5 font-semibold tracking-wide uppercase">
                Standard Plan
            </span>
        </div>
        <div class="mt-4 flex justify-center text-6xl leading-none font-extrabold dark:text-white">
            $10
            <span class="ml-1 pt-8 text-2xl leading-8 font-medium text-gray-500 dark:text-gray-400">
                /month
            </span>
        </div>
    </div>
    <div class="px-6 pt-6 pb-8 bg-white dark:bg-gray-700 sm:p-10 sm:pt-6">
        <ul>
            <li class="mt-4 flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p class="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    $10/month
                </p>
            </li>
            <li class="mt-4 flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p class="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    Unlimited number of projects
                </p>
            </li>
            <li class="mt-4 flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p class="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    Cancel anytime
                </p>
            </li>
        </ul>
        <div class="mt-6 rounded-md shadow">
            <a href="#" class="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                Start plan
            </a>
        </div>
    </div>
</div>
<div class="rounded-lg shadow-lg overflow-hidden mb-4">
    <div class="px-6 py-8 bg-white dark:bg-gray-600 sm:p-10 sm:pb-6">
        <div class="flex justify-center">
            <span class="inline-flex px-4 py-1 dark:text-white rounded-full text-sm leading-5 font-semibold tracking-wide uppercase">
                Standard Plan
            </span>
        </div>
        <div class="mt-4 flex justify-center text-6xl leading-none font-extrabold dark:text-white">
            $10
            <span class="ml-1 pt-8 text-2xl leading-8 font-medium text-gray-500 dark:text-gray-400">
                /month
            </span>
        </div>
    </div>
    <div class="px-6 pt-6 pb-8 bg-white dark:bg-gray-700 sm:p-10 sm:pt-6">
        <ul>
            <li class="mt-4 flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p class="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    $10/month
                </p>
            </li>
            <li class="mt-4 flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p class="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    Unlimited number of projects
                </p>
            </li>
            <li class="mt-4 flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p class="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    Cancel anytime
                </p>
            </li>
        </ul>
        <div class="mt-6 rounded-md shadow">
            <a href="#" class="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                Start plan
            </a>
        </div>
    </div>
</div>
        </div>


       </div>
        
    )
  }
  